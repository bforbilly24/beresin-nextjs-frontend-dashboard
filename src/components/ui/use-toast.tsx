import * as React from 'react';

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;

let count = 0;

function genId() {
	count = (count + 1) % Number.MAX_SAFE_INTEGER;
	return count.toString();
}

const toastTimeouts = new Map();

const addToRemoveQueue = (toastId: string) => {
	if (toastTimeouts.has(toastId)) {
		return;
	}

	const timeout = setTimeout(() => {
		toastTimeouts.delete(toastId);
		dispatch({
			type: 'REMOVE_TOAST',
			toastId: toastId,
		});
	}, TOAST_REMOVE_DELAY);

	toastTimeouts.set(toastId, timeout);
};

interface Toast {
	id: string;
	message: string;
	open: boolean;
	onOpenChange?: (open: boolean) => void;
}

interface State {
	toasts: Toast[];
}

interface Action {
	type: string;
	toast?: Toast;
	toastId?: string;
}

export const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'ADD_TOAST': {
			if (!action.toast) {
				return state; // If action.toast is undefined, return the current state.
			}

			return {
				...state,
				toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
			};
		}

		case 'UPDATE_TOAST': {
			if (!action.toast) {
				return state; // If action.toast is undefined, return the current state.
			}

			return {
				...state,
				toasts: state.toasts.map((t) => (t.id === action.toast?.id ? { ...t, ...action.toast } : t)),
			};
		}
        
		case 'DISMISS_TOAST': {
			const { toastId } = action;

			if (toastId) {
				addToRemoveQueue(toastId);
			} else {
				state.toasts.forEach((toast) => {
					addToRemoveQueue(toast.id);
				});
			}

			return {
				...state,
				toasts: state.toasts.map((t) => (t.id === toastId || toastId === undefined ? { ...t, open: false } : t)),
			};
		}

		case 'REMOVE_TOAST':
			if (action.toastId === undefined) {
				return {
					...state,
					toasts: [],
				};
			}
			return {
				...state,
				toasts: state.toasts.filter((t) => t.id !== action.toastId),
			};

		default:
			return state;
	}
};

// Listeners to manage state updates
const listeners: Array<(state: State) => void> = [];

let memoryState: State = { toasts: [] };

function dispatch(action: Action) {
	memoryState = reducer(memoryState, action);
	listeners.forEach((listener) => {
		listener(memoryState);
	});
}

function toast(props: Omit<Toast, 'id' | 'open' | 'onOpenChange'>): {
	id: string;
	dismiss: () => void;
	update: (props: Omit<Toast, 'id' | 'open' | 'onOpenChange'>) => void;
} {
	const id = genId();

	const update = (props: Omit<Toast, 'id' | 'open' | 'onOpenChange'>) =>
		dispatch({
			type: 'UPDATE_TOAST',
			toast: {
				...props,
				id,
				open: false, // Ensure 'open' is set to false when updating the toast
			},
		});

	const dismiss = () => dispatch({ type: 'DISMISS_TOAST', toastId: id });

	dispatch({
		type: 'ADD_TOAST',
		toast: {
			...props,
			id,
			open: true, // Ensure 'open' is set to true when adding a new toast
			onOpenChange: (open: boolean) => {
				if (!open) dismiss();
			},
		},
	});

	return {
		id,
		dismiss,
		update,
	};
}

function useToast() {
	const [state, setState] = React.useState<State>(memoryState);

	React.useEffect(() => {
		listeners.push(setState);
		return () => {
			const index = listeners.indexOf(setState);
			if (index > -1) {
				listeners.splice(index, 1);
			}
		};
	}, [state]);

	return {
		...state,
		toast,
		dismiss: (toastId: string) => dispatch({ type: 'DISMISS_TOAST', toastId }),
	};
}

export { useToast, toast };

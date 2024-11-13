'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';

interface AlertModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	loading: boolean;
	title: string; // Add title prop
	description: string; // Add description prop
}

export const AlertModal: React.FC<AlertModalProps> = ({
	isOpen,
	onClose,
	onConfirm,
	loading,
	title, // Use the title prop here
	description, // Use the description prop here
}) => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	return (
		<Modal
			title={title} 
			description={description} 
			isOpen={isOpen}
			onClose={onClose}
		>
			<div className='flex w-full items-center justify-end space-x-2 pt-6'>
				<Button disabled={loading} variant='outline' onClick={onClose}>
					Cancel
				</Button>
				<Button disabled={loading} variant='destructive' onClick={onConfirm}>
					Continue
				</Button>
			</div>
		</Modal>
	);
};

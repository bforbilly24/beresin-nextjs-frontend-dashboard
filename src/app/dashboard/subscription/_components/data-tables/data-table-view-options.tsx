'use client';

import { EyeOpenIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';

interface DataTableViewOptionsProps {
	allColumnHeaders: string[];
	visibleKeys: string[];
	onViewOptionChange: (header: string, isVisible: boolean) => void;
}

function DataTableViewOptions({ allColumnHeaders = [], visibleKeys, onViewOptionChange }: DataTableViewOptionsProps) {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [checkedState, setCheckedState] = useState<Record<string, boolean>>({});

	useEffect(() => {
		// Initialize checked state based on the visible columns
		const initialCheckedState: Record<string, boolean> = {};

		allColumnHeaders.forEach((header) => {
			initialCheckedState[header] = visibleKeys.includes(header);
		});

		setCheckedState(initialCheckedState);
	}, [allColumnHeaders, visibleKeys]);

	const handleCheckedChange = (header: string, isChecked: boolean) => {
		setCheckedState((prevState) => ({
			...prevState,
			[header]: isChecked,
		}));
	};

	const applyChanges = () => {
		// Sync the checked state with the parent component via onViewOptionChange
		allColumnHeaders.forEach((header) => {
			if (checkedState[header] !== undefined) {
				onViewOptionChange(header, checkedState[header]);
			}
		});
	};

	return (
		<div>
			<Button variant='outline' size='sm' onClick={() => setDrawerOpen(true)}>
				<EyeOpenIcon className='mr-2 h-4 w-4' />
				View Options
			</Button>

			<Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
				<DrawerContent>
					<DrawerHeader className='flex flex-col gap-y-8'>
						<DrawerTitle>Coloumn</DrawerTitle>
						<div className='grid grid-cols-3 gap-2'>
							{allColumnHeaders.length > 0 ? (
								allColumnHeaders.map((header) => (
                                    <div key={header} className='flex items-center'>
                                      <Checkbox checked={checkedState[header]} onCheckedChange={(isChecked) => handleCheckedChange(header, isChecked)} />
                                      <span className='ml-2'>{header}</span>
                                    </div>
                                  
								))
							) : (
								<span>No columns available</span>
							)}
						</div>
					</DrawerHeader>
					<DrawerFooter className='flex flex-col gap-y-4'>
						<Button
							onClick={() => {
								applyChanges();
								setDrawerOpen(false);
							}}
						>
							Apply
						</Button>
						<DrawerClose asChild>
							<Button variant={'secondary'}>Cancel</Button>
						</DrawerClose>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</div>
	);
}

export { DataTableViewOptions };

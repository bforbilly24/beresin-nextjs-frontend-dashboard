'use client';

import { useEffect, useState } from 'react';
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { DataUser } from '@/types/data-user';
import { UserFilterRole } from '../user-filter-role';
import { DataTableViewOptions } from './data-table-view-options';

interface DataTableToolbarProps {
    data: DataUser[];
    fetchData: (filters: { role?: string }) => void;
    searchTerm: string;
    onSearchChange: (value: string) => void;
    filters: { role: string };
    setFilters: React.Dispatch<React.SetStateAction<{ role: string }>>;
    searchPlaceholder: string;
    error: string | null;
    allColumnHeaders: string[];
    visibleKeys: string[];
    onViewOptionChange: (header: string, isVisible: boolean) => void;
    onSortChange?: (sortColumn: string, sortOrder: string) => void; // Made optional
    sortColumn?: string; // Made optional
    sortOrder?: string; // Made optional
  }  

const DataTableToolbar: React.FC<DataTableToolbarProps> = ({ fetchData, searchTerm, onSearchChange, searchPlaceholder, filters, setFilters, error, allColumnHeaders, visibleKeys, onViewOptionChange, onSortChange }) => {
	const [alertOpen, setAlertOpen] = useState(false);
	const [alertType, setAlertType] = useState<string>('error');
	const [alertMessage, setAlertMessage] = useState<string | object>('');
	const [isLoading, setIsLoading] = useState(false);
	const [selectedRole, setSelectedRole] = useState<string | null>(null);

	// Update filters when role changes
	useEffect(() => {
		setFilters({
			role: selectedRole || '',
		});
	}, [selectedRole, setFilters]);

	useEffect(() => {
		fetchData({
			role: selectedRole ?? undefined,
		});
	}, [selectedRole, fetchData]);

	const handleRoleChange = (role: string | null) => {
		setSelectedRole(role); // Set selected role, null for clear filter
	};

	return (
		<div className='flex flex-row justify-between items-center'>
			<div className='flex flex-row items-center justify-start gap-x-4'>
				<Input className='w-60' placeholder={searchPlaceholder} value={searchTerm} onChange={(e) => onSearchChange(e.target.value)} />

				{/* Role filter */}
				<UserFilterRole selectedRole={selectedRole} onRoleChange={handleRoleChange} />
			</div>

			<div className='flex gap-5 w-fit items-center justify-end'>
				{/* Column View Options */}
				<DataTableViewOptions allColumnHeaders={allColumnHeaders} visibleKeys={visibleKeys} onViewOptionChange={onViewOptionChange} />

				{/* Error or Status Dialog */}
				<AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
					<AlertDialogContent>
						<AlertDialogTitle>{isLoading ? 'Loading...' : alertType === 'error' ? 'Error' : 'Success'}</AlertDialogTitle>
						<AlertDialogDescription>{isLoading ? 'Loading categories...' : JSON.stringify(alertMessage)}</AlertDialogDescription>
						{!isLoading && (
							<AlertDialogFooter>
								<AlertDialogCancel onClick={() => setAlertOpen(false)}>Close</AlertDialogCancel>
							</AlertDialogFooter>
						)}
					</AlertDialogContent>
				</AlertDialog>
			</div>
		</div>
	);
};

export { DataTableToolbar };

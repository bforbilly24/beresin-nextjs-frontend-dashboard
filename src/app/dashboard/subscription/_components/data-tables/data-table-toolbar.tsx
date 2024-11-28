'use client'
import { Cross2Icon, ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import Loader from '@/components/miscellaneous/loader';
import { FilterCategory } from '@/components/service-tables/filter-category';
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataTableViewOptions } from './data-table-view-options';

interface DataTableToolbarProps {
	fetchData: (filters: { categoryIds: string[]; boostName: string }) => void;
	searchPlaceholder: string;
	searchTerm: string;
	onSearchChange: (searchTerm: string) => void;
	error: string | null;
	allColumnHeaders: string[];
	visibleKeys: string[];
	onViewOptionChange: (header: string, isVisible: boolean) => void;
	onSortChange: (value: string) => void;
	sortColumn: string;
	sortOrder: 'asc' | 'desc' | '';
}

function DataTableToolbar({ fetchData, searchPlaceholder, searchTerm, onSearchChange, error, allColumnHeaders, visibleKeys, onViewOptionChange, onSortChange, sortColumn, sortOrder }: DataTableToolbarProps) {
	const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
	const [alertOpen, setAlertOpen] = useState(false);
	const [alertType, setAlertType] = useState<string>('error');
	const [alertMessage, setAlertMessage] = useState<string | object>('');
	const [isLoading, setIsLoading] = useState(false);
	const [boostNameFilter, setBoostNameFilter] = useState<string>(''); // State for boost_name filter

	// Handle error messages
	useEffect(() => {
		if (error) {
			setAlertType('error');
			setAlertMessage(error);
			setAlertOpen(true);
		}
	}, [error]);

	// Fetch data based on selected categories and boost name filter
	useEffect(() => {
		setIsLoading(true);
		fetchData({
			categoryIds: Array.from(selectedCategories), // Convert Set to Array
			boostName: boostNameFilter, // Pass boost_name filter
		}).finally(() => setIsLoading(false));
	}, [selectedCategories, boostNameFilter, fetchData]);

	// Toggle category selection
	const handleCategoryChange = (categoryId: string) => {
		setSelectedCategories((prev) => {
			const updated = new Set(prev);
			if (updated.has(categoryId)) {
				updated.delete(categoryId); // Remove category
			} else {
				updated.add(categoryId); // Add category
			}
			return updated;
		});
	};

	// Reset filters
	const resetFilters = () => {
		setSelectedCategories(new Set());
		setBoostNameFilter(''); // Reset boost_name filter
		fetchData({ categoryIds: [], boostName: '' }); // Pass empty filters to fetchData
	};

	return (
		<div className='flex items-center justify-between gap-x-4'>
			<div className='flex flex-row items-center justify-start w-full space-x-5'>
				<input placeholder={searchPlaceholder} className='h-8 w-80' value={searchTerm} onChange={(event) => onSearchChange(event.target.value)} />

				{/* Category Filter */}
				<FilterCategory selectedCategories={selectedCategories} onCategoryChange={handleCategoryChange} onReset={resetFilters} />

				{selectedCategories.size > 0 && (
					<Button onClick={resetFilters} className='h-8 px-3'>
						Reset
						<Cross2Icon className='ml-1 h-4 w-4' />
					</Button>
				)}

				{/* Boost Name Filter */}
				<input type='text' placeholder='Filter by Boost Name' value={boostNameFilter} onChange={(e) => setBoostNameFilter(e.target.value)} className='h-8 w-80 border rounded px-4' />
			</div>
			<div className='flex gap-5 w-fit items-center justify-end'>
				{/* Add DataTableViewOptions to the toolbar */}
				<DataTableViewOptions allColumnHeaders={allColumnHeaders} visibleKeys={visibleKeys} onViewOptionChange={onViewOptionChange} />

				<AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
					<AlertDialogContent>
						<AlertDialogTitle className='flex items-center gap-x-2'>
							{isLoading ? null : alertType === 'error' ? <ExclamationTriangleIcon className='h-4 w-4' aria-hidden /> : null}
							<p>{isLoading ? null : alertType === 'error' ? 'Error' : 'Success'}</p>
						</AlertDialogTitle>
						<AlertDialogDescription>{isLoading ? <Loader /> : JSON.stringify(alertMessage)}</AlertDialogDescription>

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
}

export { DataTableToolbar };

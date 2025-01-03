'use client';

import { useEffect, useState } from 'react';
import { getCategories } from '@/actions/category/get-category';
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { ServiceFilterCategory } from '../service-filter-category';
import { ServiceFilterSubscription } from '../service-filter-subscription';
import { DataTableViewOptions } from './data-table-view-options';
import { Service } from '@/types/service';

interface DataTableToolbarProps {
    data: Service[];  
	fetchData: (filters: { categoryIds: string[]; subscription?: string; boostName?: string }) => void;
	searchTerm: string;
	onSearchChange: (value: string) => void;
	filters: { category: string };
	setFilters: React.Dispatch<React.SetStateAction<{ category: string; subscription: string; boost_name: string }>>; // Include subscription and boost_name in filters
	searchPlaceholder: string;
	error: string | null;
	allColumnHeaders: string[];
	visibleKeys: string[];
	onViewOptionChange: (header: string, isVisible: boolean) => void;
	onSortChange: (value: string) => void;
	sortColumn: string;
	sortOrder: 'asc' | 'desc' | '';
}

const DataTableToolbar: React.FC<DataTableToolbarProps> = ({ fetchData, searchTerm, onSearchChange, searchPlaceholder, filters, setFilters, error, allColumnHeaders, visibleKeys, onViewOptionChange, onSortChange, sortColumn, sortOrder }) => {
	const [alertOpen, setAlertOpen] = useState(false);
	const [alertType, setAlertType] = useState<string>('error');
	const [alertMessage, setAlertMessage] = useState<string | object>('');
	const [isLoading, setIsLoading] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // Single category selection state
	const [categories, setCategories] = useState<{ id: string; name_of_category: string }[]>([]); // Store categories as string ids
	const [selectedSubscription, setSelectedSubscription] = useState<boolean | null>(null);
	const [selectedBoostName, setSelectedBoostName] = useState<string | null>(null);

	const boostNames = ['Basic Boost', 'Standard Boost', 'Premium Boost']; // Example boost names

	// Fetch categories on mount
	useEffect(() => {
		const loadCategories = async () => {
			const fetchedCategories = await getCategories();
			// Convert id to string for all categories
			const categoriesWithStringId = fetchedCategories.map((category) => ({
				...category,
				id: category.id.toString(), // Ensure id is a string
			}));
			setCategories(categoriesWithStringId); // Set categories to state
		};
		loadCategories();
	}, []);

	// Update filters when category, subscription, or boost change
	useEffect(() => {
		setFilters({
			category: selectedCategory || '', // Empty string if no category selected
			subscription: selectedSubscription !== null ? (selectedSubscription ? 'true' : 'false') : '', // Handle subscription as string
			boost_name: selectedBoostName || '', // Adding boost_name filter
		});
	}, [selectedCategory, selectedSubscription, selectedBoostName, setFilters]);

	// Fetch data with the selected filters
	useEffect(() => {
		fetchData({
			categoryIds: selectedCategory ? [selectedCategory] : [], // Only one category allowed
			subscription: selectedSubscription !== null ? (selectedSubscription ? 'true' : 'false') : undefined, // Convert to string or undefined
			boostName: selectedBoostName || undefined, // Convert null to undefined
		});
	}, [selectedCategory, selectedSubscription, selectedBoostName, fetchData]);

	const handleCategoryChange = (categoryId: string | null) => {
		setSelectedCategory(categoryId); // Set selected category, null for clear filter
	};

	const handleSubscriptionChange = (status: boolean | null) => {
		// If the status is "not subscription" (false), reset the boost name filter
		if (status === false) {
			setSelectedBoostName(null); // Clear boost name when subscription is false
		}
		setSelectedSubscription(status);
	};

	const handleBoostNameChange = (boostName: string | null) => {
		// Only allow boost name to be set if subscription is true
		if (selectedSubscription === true) {
			setSelectedBoostName(boostName);
		} else {
			setSelectedBoostName(null); // Clear boost name if subscription is not true
		}
	};

	return (
		<div className='flex flex-row justify-between items-center'>
			<div className='flex flex-row items-center justify-start gap-x-4'>
				<Input className='w-60' placeholder={searchPlaceholder} value={searchTerm} onChange={(e) => onSearchChange(e.target.value)} />

				{/* Menampilkan filter kategori */}
				<ServiceFilterCategory selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} categories={categories} />

				{/* Menampilkan filter subscription */}
				<ServiceFilterSubscription
					selectedSubscription={selectedSubscription}
					selectedBoostName={selectedBoostName}
					onSubscriptionChange={handleSubscriptionChange}
					onBoostNameChange={handleBoostNameChange}
					boostNames={boostNames}
					// Disable boost name selection if subscription is false
					disableBoostName={selectedSubscription === false}
				/>
			</div>

			<div className='flex gap-5 w-fit items-center justify-end'>
				{/* Opsi Tampilan Kolom */}
				<DataTableViewOptions allColumnHeaders={allColumnHeaders} visibleKeys={visibleKeys} onViewOptionChange={onViewOptionChange} />

				{/* Dialog untuk Error atau Status */}
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

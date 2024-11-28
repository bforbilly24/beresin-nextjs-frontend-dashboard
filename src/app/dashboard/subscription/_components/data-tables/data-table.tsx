'use client';
'use client';

import { useCallback, useEffect, useState } from 'react';
import { getSubscriptions } from '@/actions/subscriptions/get-subscriptions';
import { DataTableToolbar } from './data-table-toolbar';

interface DataTableProps {
	sessionToken: string;
	services: any[]; // Define your service type
}

const DataTable = ({ sessionToken, services }: DataTableProps) => {
	const [subscriptions, setSubscriptions] = useState<any[]>([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [visibleKeys, setVisibleKeys] = useState<string[]>([
		'id',
		'service_id',
		'boost_name',
		'price',
		'is_active', // Add is_active to visible columns
		'expired_at', // Add expired_at to visible columns
		'duration', // Add duration to visible columns
	]);
	const [sortColumn, setSortColumn] = useState<string>('id');
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | ''>('asc');
	const [isLoading, setIsLoading] = useState(false);

	// Function to fetch data with applied filters
	const fetchData = useCallback(
		async ({ categoryIds, boostName }: { categoryIds: string[]; boostName: string }) => {
			try {
				setIsLoading(true);
				const response = await getSubscriptions(sessionToken, undefined, { categoryIds, boostName });

				if (response) {
					console.log('Fetched Subscriptions:', response); // Debug response
					setSubscriptions(response);
					setError(null); // Clear any errors
				} else {
					setSubscriptions([]);
					setError('No data found.');
				}
			} catch (err) {
				console.error('Error fetching subscriptions:', err);
				setSubscriptions([]);
				setError('Failed to fetch subscriptions.');
			} finally {
				setIsLoading(false); // End loading state
			}
		},
		[sessionToken],
	);

	// Handle search input change with debouncing
	const onSearchChange = (term: string) => {
		setSearchTerm(term);
	};

	// Fetch data on mount and when the search term changes
	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			fetchData({ categoryIds: [], boostName: searchTerm });
		}, 500); // Delay for debouncing search term

		return () => clearTimeout(delayDebounceFn); // Cleanup debounce
	}, [searchTerm, fetchData]);

	useEffect(() => {
		fetchData({ categoryIds: [], boostName: '' });
	}, [fetchData]);

	return (
		<div className='overflow-x-auto'>
			<DataTableToolbar
				fetchData={fetchData} // Pass fetchData to the toolbar
				searchPlaceholder='Search Subscriptions'
				searchTerm={searchTerm}
				onSearchChange={onSearchChange}
				error={error}
				allColumnHeaders={['id', 'service_id', 'boost_name', 'duration', 'price', 'is_active', 'expired_at']} // Updated headers
				visibleKeys={visibleKeys}
				onViewOptionChange={(header, isVisible) => {
					if (isVisible) {
						setVisibleKeys((prev) => [...prev, header]);
					} else {
						setVisibleKeys((prev) => prev.filter((key) => key !== header));
					}
				}}
				onSortChange={(value) => {
					const [column, order] = value.split('_');
					setSortColumn(column);
					setSortOrder(order as 'asc' | 'desc');
				}}
				sortColumn={sortColumn}
				sortOrder={sortOrder}
			/>

			{/* Show loading state if still fetching */}
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<table>
					<thead>
						<tr>
							{visibleKeys.includes('id') && <th>ID</th>}
							{visibleKeys.includes('service_id') && <th>Service ID</th>}
							{visibleKeys.includes('boost_name') && <th>Boost Name</th>}
							{visibleKeys.includes('duration') && <th>Duration</th>}
							{visibleKeys.includes('price') && <th>Price</th>}
							{visibleKeys.includes('is_active') && <th>Is Active</th>}
							{visibleKeys.includes('expired_at') && <th>Expired At</th>}
						</tr>
					</thead>
					<tbody>
						{subscriptions.map((subscription) => (
							<tr key={subscription.id}>
								{visibleKeys.includes('id') && <td>{subscription.id}</td>}
								{visibleKeys.includes('service_id') && <td>{subscription.service_id}</td>}
								{visibleKeys.includes('boost_name') && <td>{subscription.boost_name}</td>}
								{visibleKeys.includes('duration') && <td>{subscription.duration}</td>}
								{visibleKeys.includes('price') && <td>{subscription.price}</td>}
								{visibleKeys.includes('is_active') && <td>{subscription.is_active ? 'Active' : 'Inactive'}</td>}
								{visibleKeys.includes('expired_at') && <td>{new Date(subscription.expired_at).toLocaleString()}</td>}
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default DataTable;

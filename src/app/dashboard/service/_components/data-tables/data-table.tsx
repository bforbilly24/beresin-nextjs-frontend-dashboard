'use client';

import { Cross2Icon, ListBulletIcon } from '@radix-ui/react-icons';
import { Ban, CheckCircle, Clock, MoreHorizontal, Trash2Icon } from 'lucide-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';
import { deleteService } from '@/actions/service/delete-service';
import { getServices } from '@/actions/service/get-services';
import { updateServiceStatus } from '@/actions/service/update-service-status';
import { getUsers } from '@/actions/user/get-user';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { formatExpiredAt } from '@/lib/format-expired-at';
import { Service } from '@/types/service';
import SubscriptionModal from '../subscriptions.modal';
import ServiceImage from './data-table-images';
import { DataTablePagination } from './data-table-pagination';
import { DataTableToolbar } from './data-table-toolbar';

interface DataTableProps {
	services: Service[];
	sessionToken: string;
}

const defaultVisibleKeys = ['name', 'images', 'name_of_service', 'description', 'category_id', 'like_count', 'bookmark_count', 'subscription', 'status'];

const DataTable: React.FC<DataTableProps> = ({ services: initialServices, sessionToken }) => {
	const [services, setServices] = useState<Service[]>(initialServices);
	const [selectedServices, setSelectedServices] = useState<number[]>([]);
	const [users, setUsers] = useState<{ [key: number]: string }>({});
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [filters, setFilters] = useState<{ category: string; subscription: string; boost_name: string }>({
		category: '',
		subscription: '',
		boost_name: '',
	});
	const [currentPage, setCurrentPage] = useState(0);
	const [visibleKeys, setVisibleKeys] = useState<string[]>(defaultVisibleKeys);
	const [pageSize, setPageSize] = useState(10);
	const isAllSelected = services.length > 0 && selectedServices.length === services.length;
	const isSomeSelected = selectedServices.length > 0 && selectedServices.length < services.length;
	const [updatingServiceId, setUpdatingServiceId] = useState<number | null>(null);
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [selectedSubscription, setSelectedSubscription] = useState<boolean | null>(null);
	const [selectedBoostName, setSelectedBoostName] = useState<string | null>(null);
	const columnAlias: Record<string, string> = {
		category_id: 'CATEGORY',
		like_count: 'LIKE',
		bookmark_count: 'BOOKMARK',
	};
	const checkboxRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (checkboxRef.current) {
			checkboxRef.current.indeterminate = isSomeSelected;
		}
	}, [isSomeSelected]);

	// Fetch user data on component mount
	useEffect(() => {
		const fetchUsers = async () => {
			const usersData = await getUsers(sessionToken);
			if (Array.isArray(usersData)) {
				const usersMap = usersData.reduce(
					(acc, user) => {
						acc[user.id] = user.name;
						return acc;
					},
					{} as { [key: number]: string },
				);
				setUsers(usersMap);
			}
		};
		fetchUsers();
	}, [sessionToken]);

	// Fetch services based on filters
	useEffect(() => {
		// console.log('Selected Category:', selectedCategory);
		// console.log('Selected Subscription:', selectedSubscription);
		// console.log('Selected Boost Name:', selectedBoostName);

		setFilters({
			category: selectedCategory || '',
			subscription: selectedSubscription !== null ? (selectedSubscription ? 'true' : 'false') : '',
			boost_name: selectedBoostName || '', // Adding boost_name filter
		});
	}, [selectedCategory, selectedSubscription, selectedBoostName, setFilters]);

	// Filter services based on category and search term
	const filteredServices = useMemo(() => {
		return services.filter((service) => {
			const matchesSearchTerm = service.name_of_service.toLowerCase().includes(searchTerm.toLowerCase());

			// Category filter (if any)
			const matchesCategory = filters.category && typeof filters.category === 'string' ? filters.category.split(',').includes(service.category_id.toString()) : true;

			// Subscription filter (if any)
			const matchesSubscription = filters.subscription && typeof filters.subscription === 'string' ? (filters.subscription === 'true' && service.subscription?.isSubscription) || (filters.subscription === 'false' && !service.subscription?.isSubscription) : true;

			// Boost Name filter (if any)
			const matchesBoostName = filters.boost_name && typeof filters.boost_name === 'string' ? service.subscription?.boost_name === filters.boost_name : true;

			return matchesSearchTerm && matchesCategory && matchesSubscription && matchesBoostName;
		});
	}, [services, searchTerm, filters]);

	// Fetch user data on component mount
	useEffect(() => {
		const fetchUsers = async () => {
			const usersData = await getUsers(sessionToken);
			if (Array.isArray(usersData)) {
				const usersMap = usersData.reduce(
					(acc, user) => {
						acc[user.id] = user.name;
						return acc;
					},
					{} as { [key: number]: string },
				);
				setUsers(usersMap);
			}
		};

		fetchUsers();
	}, [sessionToken]);

	// Fetch services based on filters
	const fetchServices = async () => {
		const newServices = await getServices(sessionToken, undefined, { category_id: filters.category });
		setServices(Array.isArray(newServices) ? newServices : []); // Ensures newServices is always an array
	};

	useEffect(() => {
		// Fetch services based on the filters
		getServices(sessionToken, undefined, { category_id: filters.category }).then((newServices) => {
			// Ensure newServices is always an array
			const servicesArray = Array.isArray(newServices) ? newServices : [newServices];
			setServices(servicesArray.filter((service) => service !== null) as Service[]);
		});
	}, [filters, sessionToken]);

	// Pagination logic
	const paginatedData = useMemo(() => {
		return filteredServices.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
	}, [filteredServices, currentPage, pageSize]);

	const handleUpdateStatus = async (serviceId: number, status: 'accept' | 'decline' | 'pending') => {
		try {
			const response = await updateServiceStatus(sessionToken, serviceId, status);
			if (response?.status === 'success') {
				setServices((prevServices) => prevServices.map((service) => (service.id === serviceId ? { ...service, status } : service)));
				toast.success(`Status updated to "${status}" successfully!`);
			} else {
				toast.error('Failed to update service status.');
			}
		} catch (error) {
			console.error(`Error updating service status:`, error);
			toast.error('Error occurred while updating status.');
		}
	};

	const handleBulkUpdateStatus = async (status: 'accept' | 'decline' | 'pending') => {
		try {
			for (const serviceId of selectedServices) {
				await handleUpdateStatus(serviceId, status);
			}
			toast.success(`Status of selected services updated to "${status}" successfully!`);
		} catch (error) {
			console.error(`Error updating service statuses:`, error);
			toast.error('Error occurred while updating statuses.');
		}
	};

	const handleDeleteSelected = async () => {
		try {
			// Call the delete service function for each selected service
			const deletePromises = selectedServices.map(async (serviceId) => {
				const response = await deleteService(sessionToken, serviceId);
				if (response && response.status === 'success') {
					console.log(`Service with ID ${serviceId} deleted successfully.`);
				} else {
					console.error(`Failed to delete service with ID: ${serviceId}`);
				}
			});

			// Wait for all delete operations to finish
			await Promise.all(deletePromises);

			// Update the services state to remove deleted services
			setServices((prevServices) => prevServices.filter((service) => !selectedServices.includes(service.id)));

			// Reset selected services after deletion
			setSelectedServices([]);

			toast.success('Selected services deleted successfully!');
		} catch (error) {
			console.error('Error deleting selected services:', error);
			toast.error('Failed to delete selected services.');
		}
	};

	// Handle selection of services
	const handleSelectService = (serviceId: number) => {
		setSelectedServices((prevSelected) => (prevSelected.includes(serviceId) ? prevSelected.filter((id) => id !== serviceId) : [...prevSelected, serviceId]));
	};

	return (
		<div className='w-full h-screen flex flex-col gap-y-4'>
			<DataTableToolbar
				data={services}
				fetchData={() => Promise.resolve()}
				searchTerm={searchTerm}
				onSearchChange={setSearchTerm}
				filters={filters}
				setFilters={setFilters}
				searchPlaceholder='Search Services'
				error={null}
				allColumnHeaders={Object.keys(initialServices[0] || {})} // All columns available for view options
				visibleKeys={visibleKeys}
				onViewOptionChange={(header, isVisible) => {
					setVisibleKeys((prevKeys) => {
						if (isVisible) {
							return prevKeys.includes(header) ? prevKeys : [...prevKeys, header];
						} else {
							return prevKeys.filter((key) => key !== header);
						}
					});
				}}
				onSortChange={() => {}}
				sortColumn=''
				sortOrder='asc'
			/>

			<div className='w-full h-fit flex justify-start items-center gap-4'>
				{selectedServices.length > 0 && (
					<Button className='h-8 flex items-center justify-center' onClick={handleDeleteSelected} variant='destructive'>
						<Trash2Icon className='mr-1 w-4 h-4' />
						Delete Selected
					</Button>
				)}

				{selectedServices.length > 0 && (
					<>
						<DropdownMenu modal={false}>
							<DropdownMenuTrigger asChild>
								<Button variant='outline' className='h-8'>
									<ListBulletIcon className='mr-1 h-4 w-4' />
									Update Selected Status
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align='end'>
								<DropdownMenuLabel>Update Status</DropdownMenuLabel>

								<DropdownMenuItem onClick={() => handleBulkUpdateStatus('accept')}>
									<CheckCircle className='mr-2 h-4 w-4 text-green-600' /> Accept All
								</DropdownMenuItem>

								<DropdownMenuItem onClick={() => handleBulkUpdateStatus('decline')}>
									<Ban className='mr-2 h-4 w-4 text-red-600' /> Decline All
								</DropdownMenuItem>

								<DropdownMenuItem onClick={() => handleBulkUpdateStatus('pending')}>
									<Clock className='mr-2 h-4 w-4 text-yellow-600' /> Pending All
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>

						<Button className='h-8 flex gap-x-1.5 items-center justify-center' onClick={() => setSelectedServices([])}>
							Clear Selected
							<Cross2Icon className='ml-1 h-4 w-4' />
						</Button>
					</>
				)}
			</div>

			<ScrollArea className='h-[28.25rem] w-full'>
				<Table className='border rounded-lg'>
					<TableHeader>
						<TableRow>
							<TableHead>
								<Checkbox
									checked={isAllSelected}
									onCheckedChange={() => {
										if (isAllSelected) {
											setSelectedServices([]); // Deselect all
										} else {
											setSelectedServices(services.map((service) => service.id)); // Select all
										}
									}}
								/>
							</TableHead>

							{visibleKeys.map((key) => (
								<TableHead key={key}>{columnAlias[key] || key.replace(/_/g, ' ').toUpperCase()}</TableHead> // Display alias if available
							))}
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{paginatedData.length > 0 ? (
							paginatedData.map((service) => (
								<TableRow key={service.id}>
									<TableCell className='w-8'>
										<Checkbox checked={selectedServices.includes(service.id)} onCheckedChange={() => handleSelectService(service.id)} />
									</TableCell>

									{visibleKeys.map((key) => {
										let value = service[key as keyof Service];

										// Menyesuaikan value untuk kolom tertentu
										if (key === 'subscription') {
											if (value && typeof value === 'object' && 'isSubscription' in value) {
												const { isSubscription, boost_name, duration, expired_at } = value;
												const formattedExpiredAt = formatExpiredAt(expired_at);
												value = `${isSubscription ? 'Yes' : 'No'}, ${boost_name || 'No Boost'}, Duration: ${duration || 'N/A'} days, Expired: ${formattedExpiredAt}`;
											} else {
												value = 'N/A';
											}
										}

										// Menentukan className untuk setiap kolom berdasarkan key
										let cellClassName = '';
										switch (key) {
											case 'images':
												cellClassName = 'w-fit text-start'; // Ukuran tetap untuk gambar
												break;
											case 'name_of_service':
												cellClassName = 'w-40'; // Nama layanan
												break;
											case 'description':
												cellClassName = 'w-40'; // Nama layanan
												break;
											case 'category_id':
												cellClassName = 'w-32'; // Kategori (misalnya tengah)
												break;
											case 'status':
												cellClassName = 'max-w-40'; // Status (misalnya tengah)
												break;
											case 'subscription':
												cellClassName = 'max-w-40'; // Subscription (text ke kiri)
												break;
											default:
												cellClassName = 'max-w-40'; // Default ke kiri
										}

										return (
											<TableCell key={`${service.id}-${key}`} className={cellClassName}>
												<Tooltip>
													<TooltipTrigger>
														<div className='line-clamp-2 text-start'>
															{key === 'images' && Array.isArray(value) ? (
																<div className='flex gap-2'>{value.length > 0 ? value.map((imagePath, index) => <ServiceImage key={index} imagePath={imagePath} />) : <span>No Image</span>}</div>
															) : typeof value === 'object' && value !== null ? (
																JSON.stringify(value)
															) : (
																value || 'N/A'
															)}
														</div>
													</TooltipTrigger>
													<TooltipContent className={cellClassName}>{key === 'images' && Array.isArray(value) ? 'Image Gallery' : value || 'N/A'}</TooltipContent>
												</Tooltip>
											</TableCell>
										);
									})}

									<TableCell className='flex flex-row gap-x-2 w-28 text-start'>
										<DropdownMenu modal={false}>
											<DropdownMenuTrigger asChild>
												<Button variant='ghost' className='h-8 w-8 p-0'>
													<span className='sr-only'>Open menu</span>
													<MoreHorizontal className='h-4 w-4' />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align='end'>
												<DropdownMenuLabel>Update Status</DropdownMenuLabel>
												<DropdownMenuItem onClick={() => handleUpdateStatus(service.id, 'accept')}>
													<CheckCircle className='mr-2 h-4 w-4 text-green-600' /> Accept
												</DropdownMenuItem>
												<DropdownMenuItem onClick={() => handleUpdateStatus(service.id, 'decline')}>
													<Ban className='mr-2 h-4 w-4 text-red-600' /> Decline
												</DropdownMenuItem>
												<DropdownMenuItem onClick={() => handleUpdateStatus(service.id, 'pending')}>
													<Clock className='mr-2 h-4 w-4 text-yellow-600' /> Pending
												</DropdownMenuItem>
											</DropdownMenuContent>

											<SubscriptionModal serviceId={service.id} sessionToken={sessionToken} setServices={setServices} fetchServices={fetchServices} setUpdatingServiceId={setUpdatingServiceId} />
										</DropdownMenu>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={visibleKeys.length + 2} className='text-center'>
									No data available.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</ScrollArea>
			<DataTablePagination
				table={{
					currentPage: currentPage,
					pageSize: pageSize,
					nextPage: () => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredServices.length / pageSize) - 1)),
					previousPage: () => setCurrentPage((prev) => Math.max(prev - 1, 0)),
					setPageIndex: setCurrentPage,
					pageCount: Math.ceil(filteredServices.length / pageSize) || 1,
				}}
				setPageSize={(size) => setPageSize(size)}
				disabled={!services.length}
				totalItems={filteredServices.length}
			/>
		</div>
	);
};

export default DataTable;

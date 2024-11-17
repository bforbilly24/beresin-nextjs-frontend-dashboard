'use client';

// src/app/dashboard/service/_components/service-tables/columns.tsx
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { Checkbox } from '@/components/ui/checkbox';
import { Service } from '@/types/service';
import { CellAction } from './cell-action';

// Define the CellImage component for displaying images
function CellImage({ images, name }: { images: string[]; name: string }) {
	const baseUrl = process.env.NEXT_PUBLIC_API_URL_IMAGE || 'http://178.128.21.130:3000';
	const imageUrl = images[0]?.startsWith('http') ? images[0] : `${baseUrl}/${images[0]}`;

	return <div className='relative aspect-square'>{images.length > 0 && <Image src={imageUrl} alt={name} fill className='rounded-lg' />}</div>;
}

export const columns: ColumnDef<Service>[] = [
	{
		id: 'select',
		header: ({ table }) => <Checkbox checked={table.getIsAllPageRowsSelected()} onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} aria-label='Select all' />,
		cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label='Select row' />,
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'user_id',
		header: 'User Id',
		cell: ({ row }) => row.getValue('user_id'),
	},
	{
		accessorKey: 'images',
		header: 'Image',
		cell: ({ row }) => {
			const images = row.getValue<string[]>('images');
			const name = row.getValue<string>('name_of_service');
			return <CellImage images={images} name={name} />;
		},
	},
	{
		accessorKey: 'isSubscription',
		header: 'Subscription',
		cell: ({ row }) => (row.getValue('isSubscription') ? 'Yes' : 'No'),
	},
	{
		accessorKey: 'name_of_service',
		header: 'Name Service',
		cell: ({ row }) => <span className='truncate'>{row.getValue('name_of_service')}</span>,
	},
	{
		accessorKey: 'category_id',
		header: 'Category',
		cell: ({ row }) => <span className='truncate'>{row.getValue('category_id')}</span>,
	},
	{
		accessorKey: 'description',
		header: 'Description',
		cell: ({ row }) => <span className='w-60 line-clamp-2'>{row.getValue('description')}</span>,
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => <span className='max-w-minx  '>{row.getValue('status')}</span>,
	},
	{
		id: 'actions',
		header: 'Action',
		cell: ({ row }) => <CellAction data={row.original as Service} />,
	},
];

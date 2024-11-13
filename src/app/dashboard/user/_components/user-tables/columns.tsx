// src/app/dashboard/user/_components/user-tables/columns.tsx
'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { DataUser } from '@/constants/data';
import { CellAction } from './cell-action';

export const columns: ColumnDef<DataUser>[] = [
	{
		id: 'select',
		header: ({ table }) => <Checkbox checked={table.getIsAllPageRowsSelected()} onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} aria-label='Select all' />,
		cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label='Select row' />,
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'username',
		header: 'Username',
	},
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'email',
		header: 'Email',
	},
	{
		accessorKey: 'phone',
		header: 'Phone',
	},
	{
		accessorKey: 'role',
		header: 'Role',
	},
	{
		id: 'actions',
		header: 'Action',
		cell: ({ row }) => <CellAction data={row.original} />, // Passing DataUser type
	},
];

// src/app/dashboard/user/_components/user-tables/index.tsx
'use client';

import { DataTable } from '@/components/ui/table/data-table';
import { DataTableFilterBox } from '@/components/ui/table/data-table-filter-box';
import { DataTableResetFilter } from '@/components/ui/table/data-table-reset-filter';
import { DataTableSearch } from '@/components/ui/table/data-table-search';
import { DataUser } from '@/constants/data';
import { columns } from './columns';
import { ROLE_OPTIONS, SORT_OPTIONS, useUserTableFilters } from './use-user-table-filters';

export default function UserTable({ data, totalData }: { data: DataUser[]; totalData: number }) {
	const { roleFilter, setRoleFilter, sortById, setSortById, isAnyFilterActive, resetFilters, searchQuery, setPage, setSearchQuery } = useUserTableFilters();

    const filteredData = data
		.filter((user) => {
			const matchesRole = !roleFilter || user.role === roleFilter;
			const matchesSearch = !searchQuery || user.name.toLowerCase().includes(searchQuery.toLowerCase());
			return matchesRole && matchesSearch;
		})
		.sort((a, b) => (sortById === 'asc' ? a.id - b.id : b.id - a.id));

	return (
		<div className='space-y-4'>
			<div className='flex flex-wrap items-center gap-4'>
				<DataTableSearch searchKey='name' searchQuery={searchQuery} setSearchQuery={setSearchQuery} setPage={setPage} />
				<DataTableFilterBox filterKey='role' title='Role' options={ROLE_OPTIONS} setFilterValue={setRoleFilter} filterValue={roleFilter} />
				<DataTableFilterBox filterKey='sortById' title='Sort by ID' options={SORT_OPTIONS} setFilterValue={setSortById} filterValue={sortById} />
				<DataTableResetFilter isFilterActive={isAnyFilterActive} onReset={resetFilters} />
			</div>
			<DataTable columns={columns} data={filteredData} totalItems={totalData} />
		</div>
	);
}

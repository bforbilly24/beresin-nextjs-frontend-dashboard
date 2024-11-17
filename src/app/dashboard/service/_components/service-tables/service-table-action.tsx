// src/app/dashboard/service/_components/service-tables/service-table-action.tsx
'use client';

import { DataTableFilterBox } from '@/components/ui/table/data-table-filter-box';
import { DataTableResetFilter } from '@/components/ui/table/data-table-reset-filter';
import { DataTableSearch } from '@/components/ui/table/data-table-search';
import { CATEGORY_OPTIONS, useServiceTableFilters } from './use-service-table-filters';

// src/app/dashboard/service/_components/service-tables/service-table-action.tsx

export default function ServiceTableAction() {
	const { categoriesFilter, setCategoriesFilter, isAnyFilterActive, resetFilters, searchQuery, setPage, setSearchQuery } = useServiceTableFilters();

	return (
		<div className='flex flex-wrap items-center gap-4'>
			<DataTableSearch searchKey='name' searchQuery={searchQuery} setSearchQuery={setSearchQuery} setPage={setPage} />
			<DataTableFilterBox filterKey='categories' title='Categories' options={CATEGORY_OPTIONS} setFilterValue={setCategoriesFilter} filterValue={categoriesFilter || ''} /> <DataTableResetFilter isFilterActive={isAnyFilterActive} onReset={resetFilters} />
		</div>
	);
}

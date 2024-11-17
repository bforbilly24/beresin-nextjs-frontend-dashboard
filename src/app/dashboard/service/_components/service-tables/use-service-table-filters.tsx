// src/app/dashboard/service/_components/service-tables/use-service-table-filters.tsx
'use client';

import { useQueryState } from 'nuqs';
import { useCallback, useMemo } from 'react';
import { searchParams } from '@/lib/searchparams';

// src/app/dashboard/service/_components/service-tables/use-service-table-filters.tsx

export const CATEGORY_OPTIONS = [
	{ value: 'Electronics', label: 'Electronics' },
	{ value: 'Furniture', label: 'Furniture' },
	{ value: 'Clothing', label: 'Clothing' },
	{ value: 'Toys', label: 'Toys' },
	{ value: 'Groceries', label: 'Groceries' },
	{ value: 'Books', label: 'Books' },
	{ value: 'Jewelry', label: 'Jewelry' },
	{ value: 'Beauty Services', label: 'Beauty Services' },
];

export function useServiceTableFilters() {
	const [searchQuery, setSearchQuery] = useQueryState('q', searchParams.q.withOptions({ shallow: false, throttleMs: 1000 }).withDefault(''));

    const [categoriesFilter, setCategoriesFilter] = useQueryState('categories', { defaultValue: '' });

	const [page, setPage] = useQueryState('page', searchParams.page.withDefault(1));

	const resetFilters = useCallback(() => {
		setSearchQuery(null);
		setCategoriesFilter(null);
		setPage(1);
	}, [setSearchQuery, setCategoriesFilter, setPage]);

	const isAnyFilterActive = useMemo(() => !!searchQuery || !!categoriesFilter, [searchQuery, categoriesFilter]);

	return {
		searchQuery,
		setSearchQuery,
		page,
		setPage,
		resetFilters,
		isAnyFilterActive,
		categoriesFilter,
		setCategoriesFilter,
	};
}

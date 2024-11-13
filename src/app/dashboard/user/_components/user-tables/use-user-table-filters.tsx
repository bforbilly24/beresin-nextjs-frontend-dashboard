// src/app/dashboard/user/_components/user-tables/use-user-table-filters.tsx
'use client';

import { useQueryState } from 'nuqs';
import { useCallback, useMemo } from 'react';
import { searchParams } from '@/lib/searchparams';

// src/app/dashboard/user/_components/user-tables/use-user-table-filters.tsx

export const ROLE_OPTIONS = [
	{ value: 'admin', label: 'Admin' },
	{ value: 'User', label: 'User' },
];

export const SORT_OPTIONS = [
	{ value: 'asc', label: 'ID Ascending' },
	{ value: 'desc', label: 'ID Descending' },
];

export function useUserTableFilters() {
	const [searchQuery, setSearchQuery] = useQueryState('q', searchParams.q.withOptions({ shallow: false, throttleMs: 1000 }).withDefault(''));
	const [roleFilter, setRoleFilter] = useQueryState('role', searchParams.role.withOptions({ shallow: false }).withDefault(''));
	const [sortById, setSortById] = useQueryState('sortById', searchParams.sortById.withOptions({ shallow: false }).withDefault('desc'));
	const [page, setPage] = useQueryState('page', searchParams.page.withDefault(1));

	const resetFilters = useCallback(() => {
		setSearchQuery(null);
		setRoleFilter(null);
		setSortById('desc'); // Reset sorting to default
		setPage(1);
	}, [setSearchQuery, setRoleFilter, setSortById, setPage]);

	const isAnyFilterActive = useMemo(() => !!searchQuery || !!roleFilter || sortById !== 'desc', [searchQuery, roleFilter, sortById]);

	return {
		searchQuery,
		setSearchQuery,
		roleFilter,
		setRoleFilter,
		sortById,
		setSortById,
		page,
		setPage,
		resetFilters,
		isAnyFilterActive,
	};
}

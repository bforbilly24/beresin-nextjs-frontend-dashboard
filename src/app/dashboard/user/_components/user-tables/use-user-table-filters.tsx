// src/app/dashboard/user/_components/user-tables/use-user-table-filters.tsx
'use client';

import { useQueryState } from 'nuqs';
import { useCallback, useMemo } from 'react';
import { searchParams } from '@/lib/searchparams';

export const ROLE_OPTIONS = [
	{ value: 'admin', label: 'Admin' },
	{ value: 'user', label: 'User' },
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
	const [pageSize, setPageSize] = useQueryState('limit', searchParams.limit.withDefault(10)); // Add pageSize and setPageSize

	const resetFilters = useCallback(() => {
		setSearchQuery(null);
		setRoleFilter(null);
		setSortById('desc');
		setPage(1);
		setPageSize(10);
	}, [setSearchQuery, setRoleFilter, setSortById, setPage, setPageSize]);

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
		pageSize, 
		setPageSize,
		resetFilters,
		isAnyFilterActive,
	};
}

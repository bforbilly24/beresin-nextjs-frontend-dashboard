'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

type BreadcrumbItem = {
	title: string;
	link: string;
};

const routeMapping: Record<string, BreadcrumbItem[]> = {
	'/dashboard': [{ title: 'Dashboard', link: '/dashboard' }],
	'/dashboard/user': [
		{ title: 'Dashboard', link: '/dashboard' },
		{ title: 'User', link: '/dashboard/user' },
	],
	'/dashboard/service': [
		{ title: 'Dashboard', link: '/dashboard' },
		{ title: 'Service', link: '/dashboard/service' },
	],
};

export function useBreadcrumbs() {
	const pathname = usePathname();

	const breadcrumbs = useMemo(() => {
		if (routeMapping[pathname]) {
			return routeMapping[pathname];
		}

		const segments = pathname.split('/').filter(Boolean);
		return segments.map((segment, index) => {
			const path = `/${segments.slice(0, index + 1).join('/')}`;
			return {
				title: segment.charAt(0).toUpperCase() + segment.slice(1),
				link: path,
			};
		});
	}, [pathname]);

	return breadcrumbs;
}

'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Toaster } from '../ui/sonner';
import Loader from './loader';

function UnauthenticatedContent() {
	const pathname = usePathname();
	const router = useRouter();

	useEffect(() => {
		router.push('/admin/auth/login');
		router.refresh();

		Toaster({
			variant: 'error',
			title: 'Gagal',
			description: `Silakan login untuk mengakses '${pathname}'`,
		});

		return () => {};
	}, [router, pathname]);

	return <Loader />;
}

export { UnauthenticatedContent };

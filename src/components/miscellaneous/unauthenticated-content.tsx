'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
// Import toast function from sonner
import Loader from './loader';

function UnauthenticatedContent() {
	const pathname = usePathname();
	const router = useRouter();

	useEffect(() => {
		router.push('/admin/auth/login');
		router.refresh();

		// Show error toast using the correct API
		toast.error(`Silakan login untuk mengakses '${pathname}'`, {
			description: 'Gagal', // Use description instead of title
		});

		return () => {};
	}, [router, pathname]);

	return <Loader />;
}

export { UnauthenticatedContent };

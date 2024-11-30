'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { PROTECTED_PAGES } from '@/constants/data';
import { AppProgressBar as ProgressBarProviderWrapper } from 'next-nprogress-bar';

function ProgressBarProvider({ children }) {
	const pathName = usePathname();
	const router = useRouter();
	useEffect(() => {
		if (typeof window !== undefined) {
			if (PROTECTED_PAGES.includes(pathName)) router.refresh();
		}
	}, [router, pathName]);

	return (
		<>
			{children}
			<ProgressBarProviderWrapper height='3px' color='#6E6D70' options={{ showSpinner: false }} shallowRouting />
		</>
	);
}

export { ProgressBarProvider };

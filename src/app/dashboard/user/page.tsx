import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { SearchParams } from 'nuqs/parsers';
import React from 'react';
import { searchParamsCache } from '@/lib/searchparams';
import authConfig from '@/utils/auth.config';
import UserListingPage from './_components/user-listing-page';

type pageProps = {
	searchParams: SearchParams;
};

export const metadata = {
	title: 'Dashboard : Users',
};

export default async function Page({ searchParams }: pageProps) {
	const session = await getServerSession(authConfig);

	if (!session) {
		redirect('/');
		return null;
	}
	// Allow nested RSCs to access the search params (in a type-safe way)
	searchParamsCache.parse(searchParams);

	return <UserListingPage />;
}

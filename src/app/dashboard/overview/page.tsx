// src/app/dashboard/overview/page.tsx
import { Metadata } from 'next';
import getServerSession from 'next-auth';
import { redirect } from 'next/navigation';
import authConfig from '@/utils/auth.config';
import OverViewPage from './_components/overview';

export const metadata: Metadata = {
	title: 'Dashboard : Overview',
};

export default async function Page() {
	const session = await getServerSession(authConfig);

	// Redirect to login if there is no session (user is not authenticated)
	if (!session) {
		redirect('/');
		return null;
	}

	// Render the overview p        age if the user is authenticated
	return <OverViewPage />;
}

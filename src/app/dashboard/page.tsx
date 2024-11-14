// src/app/dashboard/page.tsx
import getServerSession from 'next-auth';
import { redirect } from 'next/navigation';
import authConfig from '@/utils/auth.config';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Dashboard : Overview',
	description: 'Overview All Content',
};

export default async function Dashboard() {
	const session = await getServerSession(authConfig);

	// If no session, redirect to login
	if (!session) {
		redirect('/');
		return null;
	}

	// Redirect to overview if session exists
	redirect('/dashboard/overview');
	return null;
}

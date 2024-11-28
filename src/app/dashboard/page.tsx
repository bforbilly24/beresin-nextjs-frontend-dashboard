import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import authConfig from '@/utils/auth.config';

export const metadata: Metadata = {
	title: 'Dashboard : Overview',
	description: 'Overview All Content',
};

export default async function Dashboard() {
	const session = await getServerSession(authConfig);

	// Redirect based on session status
	if (!session) {
		redirect('/'); // Redirect to login if no session
	}

	redirect('/dashboard/overview'); // Redirect to dashboard overview if session exists
}

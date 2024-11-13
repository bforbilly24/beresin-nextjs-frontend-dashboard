// src/app/(auth)/(signin)/page.tsx
import { Metadata } from 'next';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import SignInViewPage from '../_components/sigin-view';
import authConfig from '@/utils/auth.config';

// Correct import for getServerSession

export const metadata: Metadata = {
	title: 'Sign In',
	description: 'Sign In page for authentication.',
};

export default async function Page() {
	// Check for an existing session
	const session = await getServerSession(authConfig);

	// If a session exists, redirect to dashboard
	if (session) {
		redirect('/dashboard');
		return null;
	}

	// If no session, render the sign-in page
	return <SignInViewPage />;
}

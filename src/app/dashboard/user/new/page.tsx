// src/app/dashboard/user/new/page.tsx
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import authConfig from '@/utils/auth.config';
import UserForm from '../_components/user-form';

export const metadata: Metadata = {
	title: 'User : Add New',
	description: 'Add New BeresIn User',
};

export default async function UserNewPage() {
	const session = await getServerSession(authConfig);

	if (!session) {
		return redirect('/');
	}

	return <UserForm session={session} actionType='POST' />;
}

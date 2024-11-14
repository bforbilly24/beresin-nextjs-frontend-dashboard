// src/app/dashboard/user/[userId]/page.tsx
import { getServerSession } from 'next-auth';
import authConfig from '@/utils/auth.config';
import { redirect } from 'next/navigation';
import UserForm from '../_components/user-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'User : Edit',
	description: 'Edit BeresIn User',
};

export default async function UserIdPage({ params }: { params: { userId: string } }) {
	const session = await getServerSession(authConfig);

	if (!session) {
		return redirect('/');
	}

	return <UserForm userId={params.userId} session={session} actionType="PUT" />;
}

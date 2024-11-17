import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import UserListingPage from '@/app/dashboard/user/_components/user-listing-page';
import { DataUser } from '@/constants/data';
import authConfig from '@/utils/auth.config';
import { Metadata } from 'next';
import { getUsers } from '@/actions/user/get-user';

export const metadata: Metadata = {
	title: 'Dashboard : User',
	description: 'Welcome to BeresIn Dashboard',
};


export default async function UserPage() {
	const session = await getServerSession(authConfig);

	if (!session) {
		redirect('/');
		return null;
	}

	let users: DataUser[] = [];
	if (session.accessToken) {
		const data = await getUsers(session.accessToken);
		users = Array.isArray(data) ? data : [];
	}

	return <UserListingPage users={users} />;
}

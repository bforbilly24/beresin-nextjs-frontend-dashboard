import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { getUsers } from '@/actions/user/get-user';
import { UnauthenticatedContent } from '@/components/miscellaneous/unauthenticated-content';
import { Heading } from '@/components/ui/heading';
import authConfig from '@/utils/auth.config';
import DataTable from './_components/data-tables/data-table';


export const metadata = {
	title: 'User Data',
};

export default async function UserPage() {
	const session = await getServerSession(authConfig);

	if (!session) {
		return <UnauthenticatedContent />;
	}

	let users = [];
	let errorMessage = '';

	try {
		users = await getUsers(session.accessToken); 
	} catch (error) {
		console.error('Error fetching users:', error);
		errorMessage = 'There was an error loading the user data. Please try again later.';
	}

	const totalUsers = users.length;

	if (!users || errorMessage) {
		return (
			<div className='p-10 h-screen w-screen flex-1 flex-col gap-8 md:flex'>
				<div className='flex flex-col justify-between gap-y-5 space-y-2'>
					<Link href='/dashboard/overview' className='flex w-fit cursor-pointer items-center gap-5 text-primary focus:outline-none'>
						<ArrowLeftIcon className='h-5 w-5' />
						<div>Back to Dashboard</div>
					</Link>
                        <Heading title='User Data' description='Manage and view user data (Server-side table functionalities).' />
				</div>

				<p>{errorMessage || 'No users available.'}</p>
			</div>
		);
	}

	return (
		<div className='p-10 h-screen w-full flex-1 flex-col gap-8 md:flex'>
			<div className='flex flex-col justify-between gap-y-5 space-y-2'>
				<Link href='/dashboard/overview' className='flex w-fit cursor-pointer items-center gap-5 text-primary focus:outline-none'>
					<ArrowLeftIcon className='h-5 w-5' />
					<div>Back to Dashboard</div>
				</Link>
				<Heading title={`User Data (${totalUsers})`} description='Manage and view user data (Server-side table functionalities).' />
			</div>

			{/* Pass the users data to DataTable component */}
			<DataTable users={users} sessionToken={session.accessToken} />
		</div>
	);
}

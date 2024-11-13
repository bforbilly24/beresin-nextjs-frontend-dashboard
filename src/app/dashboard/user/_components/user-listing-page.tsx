// src/app/dashboard/user/_components/user-listing-page.tsx
import { Plus } from 'lucide-react';
import Link from 'next/link';
import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import UserTable from './user-tables';
import { DataUser } from '@/constants/data';
import { cn } from '@/lib/utils';

interface UserListingPageProps {
	users: DataUser[];
}

export default function UserListingPage({ users }: UserListingPageProps) {
	const totalUsers = users.length;

	return (
		<PageContainer scrollable>
			<div className='space-y-4'>
				<div className='flex items-start justify-between'>
					<Heading title={`User (${totalUsers})`} description='Manage users (Server-side table functionalities).' />
					<Link href={'/dashboard/user/new'} className={cn(buttonVariants({ variant: 'default' }))}>
						<Plus className='mr-2 h-4 w-4' /> Add New
					</Link>
				</div>
				<Separator />
				<UserTable data={users} totalData={totalUsers} />
			</div>
		</PageContainer>
	);
}

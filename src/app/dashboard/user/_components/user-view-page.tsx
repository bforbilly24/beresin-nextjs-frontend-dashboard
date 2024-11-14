// src/app/dashboard/user/_components/user-view-page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { ScrollArea } from '@/components/ui/scroll-area';
import UserForm from './user-form';

export default function UserViewPage() {
	const { data: session } = useSession();

	return (
		<ScrollArea className='h-full'>
			<div className='flex-1 space-y-4 p-8'>
				<UserForm session={session} actionType='POST' />
			</div>
		</ScrollArea>
	);
}

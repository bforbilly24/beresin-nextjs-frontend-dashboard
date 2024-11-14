'use client';

import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { deleteUser } from '@/actions/user/delete-user';
import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { DataUser } from '@/constants/data';

interface CellActionProps {
	data: DataUser;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const router = useRouter();
	const { data: session } = useSession();

	const handleEdit = () => {
		router.push(`/dashboard/user/${data.id}`);
	};

	const onConfirm = async () => {
		setLoading(true);
		const token = session?.accessToken;

		if (!token) {
			toast.error('You must be logged in to perform this action.');
			setLoading(false);
			setOpen(false);
			return;
		}

		const response = await deleteUser(token, data.id);

		setLoading(false);
		setOpen(false);

		if (response && response.status === 'success') {
			toast.success(response.message || 'User deleted successfully.');
			router.refresh(); 
		} else {
			toast.error(response?.message || 'Something went wrong.');
		}
	};

	return (
		<>
			<AlertModal
				isOpen={open}
				onClose={() => setOpen(false)}
				onConfirm={onConfirm}
				loading={loading}
				title='Are you sure?'
				description={`Are you sure you want to delete user ${data.username}? This action cannot be undone.`} // Description for the confirmation modal
			/>
			<DropdownMenu modal={false}>
				<DropdownMenuTrigger asChild>
					<Button variant='ghost' className='h-8 w-8 p-0'>
						<span className='sr-only'>Open menu</span>
						<MoreHorizontal className='h-4 w-4' />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<DropdownMenuLabel>Actions</DropdownMenuLabel>

					<DropdownMenuItem onClick={handleEdit}>
					<Edit className='mr-2 h-4 w-4' /> Update
				</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setOpen(true)}>
						<Trash className='mr-2 h-4 w-4' /> Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};

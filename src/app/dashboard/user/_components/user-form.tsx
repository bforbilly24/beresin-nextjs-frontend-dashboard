// src/app/dashboard/user/_components/UserForm.tsx
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { getUsers } from '@/actions/user/get-user';
import { postUser } from '@/actions/user/post-user';
import { putUser } from '@/actions/user/put-user';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

// src/app/dashboard/user/_components/UserForm.tsx

// Define schema for POST requests
const postSchema = z.object({
	username: z.string().min(1, 'Username is required.'),
	name: z.string().min(2, 'Name must be at least 2 characters.'),
	email: z.string().email('Please enter a valid email address.'),
	phone: z.string().min(10, 'Phone number must be valid.'),
	password: z.string().min(6, 'Password must be at least 6 characters.'),
	role: z.string(),
});

// Define schema for PUT requests
const putSchema = z.object({
	id: z.number().nonnegative(),
	username: z.string().optional(),
	name: z.string().optional(),
	email: z.string().optional(),
	phone: z.string().optional(),
	role: z.string().optional(),
});

type FormData = z.infer<typeof postSchema> & z.infer<typeof putSchema>;

interface UserFormProps {
	session: any;
	actionType: 'POST' | 'PUT';
	userId?: string;
}

export default function UserForm({ session, actionType, userId }: UserFormProps) {
	const router = useRouter();

	const form = useForm<FormData>({
		resolver: zodResolver(actionType === 'POST' ? postSchema : putSchema),
		defaultValues: {
			id: userId ? parseInt(userId, 10) : undefined,
			username: '',
			name: '',
			email: '',
			phone: '',
			password: '',
			role: '',
		},
	});

	// Fetch user data if in edit (PUT) mode
	useEffect(() => {
		const fetchUser = async () => {
			if (actionType === 'PUT' && session?.accessToken && userId) {
				const user = await getUsers(session.accessToken, parseInt(userId, 10));
				if (user && !Array.isArray(user)) {
					form.reset(user);
				}
			}
		};
		fetchUser();
	}, [session, userId, actionType, form]);

	const onSubmit = async (values: FormData) => {
		const token = session?.accessToken;
		if (!token) {
			console.error('User is not authenticated.');
			return;
		}

		try {
			let response;
			if (actionType === 'POST') {
				response = await postUser(token, values);
			} else if (actionType === 'PUT' && values.id) {
				response = await putUser(token, values.id, values);
			}

			if (response && response.status === 'success') {
				toast.success(`User ${actionType === 'POST' ? 'created' : 'updated'} successfully`);
				router.push('/dashboard/user');
			}
		} catch (error) {
			console.error(`Error ${actionType === 'POST' ? 'creating' : 'updating'} user:`, error);
			toast.error('An error occurred. Please try again.');
		}
	};

	return (
		<Card className='mx-auto w-full'>
			<CardHeader>
				<CardTitle className='text-left text-2xl font-bold'>{actionType === 'POST' ? 'Add New User' : 'Edit User'}</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 md:space-y-8'>
						{actionType === 'PUT' && (
							<FormField
								control={form.control}
								name='id'
								render={({ field }) => (
									<FormItem>
										<FormLabel>User ID</FormLabel>
										<FormControl>
											<Input value={field.value} disabled placeholder='User ID' />
										</FormControl>
									</FormItem>
								)}
							/>
						)}

						{/* Username and Name Fields */}
						<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
							<FormField
								control={form.control}
								name='username'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Username</FormLabel>
										<FormControl>
											<Input placeholder='Username' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input placeholder='Full Name' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						{/* Email and Phone Fields */}
						<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input type='email' placeholder='Email Address' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='phone'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Phone</FormLabel>
										<FormControl>
											<Input placeholder='Phone Number' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						{/* Role Field */}
						<FormField
							control={form.control}
							name='role'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Role</FormLabel>
									<FormControl>
										<Input placeholder='Role (e.g., Admin, User)' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Password Field (Only for POST Action) */}
						{actionType === 'POST' && (
							<FormField
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input type='password' placeholder='Password' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}

						<Button type='submit'>{actionType === 'POST' ? 'Add User' : 'Update User'}</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}

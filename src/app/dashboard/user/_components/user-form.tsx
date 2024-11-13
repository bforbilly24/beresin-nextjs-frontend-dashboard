'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { deleteUser } from '@/actions/user/delete-user';
import { postUser } from '@/actions/user/post-user';
import { putUser } from '@/actions/user/put-user';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

// Define schemas for different actions
const postSchema = z.object({
	id: z.number().optional(),
	username: z.string().min(1, 'Username is required for creating a user.'),
	name: z.string().min(2, 'Name must be at least 2 characters.'),
	email: z.string().email('Please enter a valid email address.'),
	phone: z.string().optional().default(''), // Ensure phone defaults to empty string
	role: z.string(),
	password: z.string().min(6, 'Password must be at least 6 characters.'),
});

const putDeleteSchema = z.object({
	id: z.number().nonnegative('ID is required for updating or deleting a user.'),
	username: z.string().optional(),
	name: z.string().optional(),
	email: z.string().optional(),
	phone: z.string().optional().default(''), // Ensure phone defaults to empty string
	role: z.string().optional(),
	password: z.string().optional(),
});

// Type for the form data
type FormData = z.infer<typeof postSchema> & z.infer<typeof putDeleteSchema>;

export default function UserForm() {
	const { data: session } = useSession(); // Use NextAuth session in the client
	const [action, setAction] = React.useState<'POST' | 'PUT' | 'DELETE'>('POST');
	const router = useRouter();

	const form = useForm<FormData>({
		resolver: zodResolver(action === 'POST' ? postSchema : putDeleteSchema),
		defaultValues: {
			id: undefined,
			username: '',
			name: '',
			email: '',
			phone: '', // Set phone to an empty string
			role: '',
			password: '',
		},
	});

	const onSubmit = async (values: FormData) => {
		const token = session?.accessToken; // Get the token from session

		if (!token) {
			console.error('User is not authenticated.');
			return;
		}

		try {
			let response;
			if (action === 'POST') {
				response = await postUser(token, values);
				if (response && response.status === 'success') {
					router.push('/dashboard/user'); // Redirect after successful POST
				}
			} else if (action === 'PUT' && values.id) {
				response = await putUser(token, values.id, values);
				if (response && response.status === 'success') {
					router.push('/dashboard/user'); // Redirect after successful PUT
				}
			} else if (action === 'DELETE' && values.id) {
				response = await deleteUser(token, values.id);
				if (response && response.message === 'User deleted successfully') {
					router.push('/dashboard/user'); // Redirect after successful DELETE
				}
			}
		} catch (error) {
			console.error('Error performing action:', error);
		}
	};

	return (
		<Card className='mx-auto w-full'>
			<CardHeader>
				<CardTitle className='text-left text-2xl font-bold'>User Information - {action} Action</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 md:space-y-8'>
						{/* Select Action */}
						<div className='space-y-4'>
							<FormLabel>Action</FormLabel>
							<RadioGroup className='flex space-x-8' value={action} onValueChange={(value) => setAction(value as 'POST' | 'PUT' | 'DELETE')}>
								<FormItem className='flex space-x-4 items-center justify-center'>
									<RadioGroupItem value='POST' />
									<FormLabel className='leading-none !mt-0'>Post</FormLabel>
								</FormItem>
								<FormItem className='flex space-x-4 items-center justify-center'>
									<RadioGroupItem value='PUT' />
									<FormLabel className='leading-none !mt-0'>Put</FormLabel>
								</FormItem>
								<FormItem className='flex space-x-4 items-center justify-center'>
									<RadioGroupItem value='DELETE' />
									<FormLabel className='leading-none !mt-0'>Delete</FormLabel>
								</FormItem>
							</RadioGroup>
						</div>

						{/* ID Field for PUT and DELETE */}
						{(action === 'PUT' || action === 'DELETE') && (
							<FormField
								control={form.control}
								name='id'
								render={({ field }) => (
									<FormItem>
										<FormLabel>User ID</FormLabel>
										<FormControl>
											<Input type='number' placeholder='Enter user ID' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}

						{/* Other fields for POST and PUT */}
						{(action === 'POST' || action === 'PUT') && (
							<>
								<div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6'>
									<FormField
										control={form.control}
										name='name'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Name</FormLabel>
												<FormControl>
													<Input placeholder='Enter your name' {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name='username'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Username</FormLabel>
												<FormControl>
													<Input placeholder='Enter username' {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6'>
									<FormField
										control={form.control}
										name='email'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input type='email' placeholder='Enter your email' {...field} />
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
													<Input placeholder='Enter your phone number' {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6'>
									<FormField
										control={form.control}
										name='role'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Role</FormLabel>
												<FormControl>
													<Input placeholder='Enter role (admin/user)' {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									{action === 'POST' && (
										<FormField
											control={form.control}
											name='password'
											render={({ field }) => (
												<FormItem>
													<FormLabel>Password</FormLabel>
													<FormControl>
														<Input type='password' placeholder='Enter password' {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									)}
								</div>
							</>
						)}

						<Button type='submit'>{action} User</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}

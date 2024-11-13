// src/app/[auth]/_components/user-auth-form.tsx
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import GithubSignInButton from './github-auth-button';

// src/app/[auth]/_components/user-auth-form.tsx

const formSchema = z.object({
	email: z.string().email({ message: 'Enter a valid email address with "@"' }),
	password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
	const router = useRouter();
	const [loading, startTransition] = useTransition();
	const form = useForm<UserFormValue>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (data: UserFormValue) => {
		const response = await signIn('credentials', {
			redirect: false,
			email: data.email,
			password: data.password,
		});

		if (response?.error) {
			toast.error('Your credentials are incorrect. Please try again.');
		} else if (response?.ok) {
			toast.success('Signed In Successfully!');
			router.push('/dashboard'); // Redirect to /dashboard after successful login
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-2'>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input type='email' placeholder='Enter your email...' autoComplete='off' disabled={loading} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input type='password' placeholder='Enter your password...' autoComplete='off' disabled={loading} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button disabled={loading} className='ml-auto w-full' type='submit'>
					Continue With Email
				</Button>
			</form>
			<div className='relative'>
				<div className='absolute inset-0 flex items-center'>
					<span className='w-full border-t' />
				</div>
				<div className='relative flex justify-center text-xs uppercase'>
					<span className='bg-background px-2 text-muted-foreground'>Or continue with</span>
				</div>
			</div>
			<GithubSignInButton />
		</Form>
	);
}

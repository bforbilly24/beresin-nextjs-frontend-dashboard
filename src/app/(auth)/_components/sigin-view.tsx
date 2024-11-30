import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import UserAuthForm from './user-auth-form';

export const metadata: Metadata = {
	title: 'Authentication',
	description: 'Authentication forms built using the components.',
};

export default function SignInViewPage() {
	return (
		<div className='relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
			<Link href='/examples/authentication' className={cn(buttonVariants({ variant: 'ghost' }), 'absolute right-4 top-4 hidden md:right-8 md:top-8')}>
				Login
			</Link>
			<div className='relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r'>
				<div className='absolute inset-0 bg-zinc-900' />
				<div className='relative z-20 flex items-center text-lg font-medium'>
					<Image src='/beresin.svg' alt='beresin-logo' width='100' height='100' />
				</div>
				<div className='relative z-20 mt-auto'>
					<blockquote className='space-y-2'>
						<p className='text-base'>
							&ldquo;Solusi Jasa Kampus, Dari Mahasiswa untuk Mahasiswa! Aplikasi marketplace berbasis mobile yang memudahkan mahasiswa menemukan dan menawarkan berbagai jasa di kampus dengan mudah, cepat, dan terpercaya. Temukan solusi terbaik dari sesama mahasiswa untuk kebutuhan
							akademik maupun non-akademik dalam satu platform!&rdquo;
						</p>
						<footer className='text-sm'>BeresIn</footer>
					</blockquote>
				</div>
			</div>
			<div className='flex h-full items-center p-4 lg:p-8'>
				<div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
					<div className='flex flex-col space-y-2 text-center'>
						<h1 className='text-2xl font-semibold tracking-tight'>Sign In into Beresin Dashboard</h1>
						<p className='text-sm text-muted-foreground'>Enter your email below to Sign In your account</p>
					</div>
					<UserAuthForm />
					<p className='px-8 text-center text-sm text-muted-foreground'>
						By clicking continue, you agree to our{' '}
						<Link href='/terms' className='underline underline-offset-4 hover:text-primary'>
							Terms of Service
						</Link>{' '}
						and{' '}
						<Link href='/privacy' className='underline underline-offset-4 hover:text-primary'>
							Privacy Policy
						</Link>
						.
					</p>
				</div>
			</div>
		</div>
	);
}

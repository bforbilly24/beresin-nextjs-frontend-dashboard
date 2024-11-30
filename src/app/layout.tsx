import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { Lato } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import Providers from '@/components/layout/providers';
import { NotReadyResponsive } from '@/components/miscellaneous/not-ready-responsive';
import { Toaster } from '@/components/ui/sonner';
import authConfig from '@/utils/auth.config';
import './globals.css';
import { ProgressBarProvider } from '@/components/providers/progress-bar-provider';

export const metadata: Metadata = {
	title: {
		template: 'BeresIn | %s ',
		default: 'BeresIn',
	},
	description: 'BeresIn - Dari Mahasiswa untuk Mahasiswa!',
};

export const viewport = {
	width: 'device-width',
	height: 'device-height',
	initialScale: 1.0,
	userScalable: false,
	targetDensitydpi: 'device-dpi',
};

const lato = Lato({
	subsets: ['latin'],
	weight: ['400', '700', '900'],
	display: 'swap',
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const session = await getServerSession(authConfig);

	return (
		<html lang='en' className={`${lato.className}`} suppressHydrationWarning={true}>
			<body className='overflow-hidden'>
				<NextTopLoader showSpinner={false} />
				<Providers session={session}>
					<ProgressBarProvider>
						<Toaster />
						<main className='xl:flex h-screen hidden'>{children}</main>
					</ProgressBarProvider>
					<NotReadyResponsive />
				</Providers>
			</body>
		</html>
	);
}

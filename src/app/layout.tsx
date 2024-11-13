import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import Providers from '@/components/layout/providers';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';
import { getServerSession } from 'next-auth';
import authConfig from '@/utils/auth.config';

export const metadata: Metadata =  {
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
					<Toaster />
					{children}
				</Providers>
			</body>
		</html>
	);
}

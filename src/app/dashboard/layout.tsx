import type { Metadata } from 'next';
import AppSidebar from '@/components/layout/app-sidebar';

export const metadata: Metadata = {
	title: 'BeresIn Dashboard',
	description: 'Basic dashboard with Next.js and Shadcn',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<AppSidebar>{children}</AppSidebar>
		</>
	);
}

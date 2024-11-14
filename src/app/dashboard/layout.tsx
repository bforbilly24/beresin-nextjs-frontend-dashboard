import AppSidebar from '@/components/layout/app-sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<AppSidebar>{children}</AppSidebar>
		</>
	);
}

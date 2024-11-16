import { Plus } from 'lucide-react';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { SearchParams } from 'nuqs/parsers';
import { Suspense } from 'react';
import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { searchParamsCache, serialize } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import authConfig from '@/utils/auth.config';
import ServiceTableAction from './_components/service-tables/service-table-action';
import ServiceListingPage from './_components/service-listing';

export const metadata: Metadata = {
	title: 'Dashboard: Services',
};

type pageProps = {
	searchParams: SearchParams;
};

export default async function Page({ searchParams }: pageProps) {
	const session = await getServerSession(authConfig);

	if (!session) {
		redirect('/');
		return null;
	}

	searchParamsCache.parse(searchParams);

	const key = serialize({ ...searchParams });

	return (
		<PageContainer>
			<div className='space-y-4'>
				<div className='flex items-start justify-between'>
					<Heading title='Services' description='Manage services (Server side table functionalities.)' />
					<Link href='/dashboard/service/new' className={cn(buttonVariants(), 'text-xs md:text-sm')}>
						<Plus className='mr-2 h-4 w-4' /> Add New
					</Link>
				</div>
				<Separator />
				<ServiceTableAction />
				<Suspense key={key} fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}>
					<ServiceListingPage />
				</Suspense>
			</div>
		</PageContainer>
	);
}

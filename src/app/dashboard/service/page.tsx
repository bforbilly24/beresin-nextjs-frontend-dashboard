import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { getServices } from '@/actions/service/get-services';
import { UnauthenticatedContent } from '@/components/miscellaneous/unauthenticated-content';
import { Heading } from '@/components/ui/heading';
import authConfig from '@/utils/auth.config';
import DataTable from './_components/data-tables/data-table';

export const metadata = {
	title: 'Service Data',
};

export default async function ServicePage() {
	const session = await getServerSession(authConfig);

	if (!session) {
		return <UnauthenticatedContent />;
	}

	let services = [];
	let errorMessage = '';

	try {
		services = await getServices(session.accessToken);
	} catch (error) {
		console.error('Error fetching services:', error);
		errorMessage = 'There was an error loading the service data. Please try again later.';
	}

	const totalServices = services.length; 

	if (!services || errorMessage) {
		return (
			<div className='p-10 h-screen w-screen flex-1 flex-col gap-8 md:flex'>
				<div className='flex flex-col justify-between gap-6 space-y-2'>
					<Link href='/dashboard/overview' className='flex w-fit cursor-pointer items-center gap-5 text-primary focus:outline-none'>
						<ArrowLeftIcon className='h-5 w-5' />
						<div>Kembali ke beranda</div>
					</Link>
					<div>
						<h2 className='text-2xl font-bold tracking-tight'>Data Jasa</h2>
					</div>
				</div>

				<p>{errorMessage || 'No services available.'}</p>
			</div>
		);
	}

	return (
		<div className='p-10 h-screen w-full flex-1 flex-col gap-8 md:flex'>
			<div className='flex flex-col justify-between gap-6 space-y-2'>
				<Link href='/dashboard/overview' className='flex w-fit cursor-pointer items-center gap-5 text-primary focus:outline-none'>
					<ArrowLeftIcon className='h-5 w-5' />
					<div>Kembali ke beranda</div>
				</Link>
				<div>
					<Heading title={`Data Jasa (${totalServices})`} description='Manage and view service data (Server-side table functionalities).' />
				</div>
			</div>

			<DataTable services={services} sessionToken={session.accessToken} />
		</div>
	);
}

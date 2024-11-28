import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { getSubscriptions } from '@/actions/subscriptions/get-subscriptions';
import { UnauthenticatedContent } from '@/components/miscellaneous/unauthenticated-content';
import authConfig from '@/utils/auth.config';
import DataTable from './_components/data-tables/data-table';

export const metadata = {
	title: 'Subscription Data',
};

export default async function SubscriptionPage() {
	// Fetch session on the server side
	const session = await getServerSession(authConfig);

	if (!session) {
		return <UnauthenticatedContent />;
	}

	// Fetch subscriptions using the session token
	let subscriptions = [];
	let errorMessage = '';

	try {
		subscriptions = await getSubscriptions(session.accessToken); // Fetch subscriptions server-side
	} catch (error) {
		console.error('Error fetching subscriptions:', error);
		errorMessage = 'There was an error loading the subscription data. Please try again later.';
	}

	// If no subscriptions or error, show a message
	if (!subscriptions || errorMessage) {
		return (
			<div className='p-10 h-screen w-screen flex-1 flex-col gap-10 md:flex'>
				<div className='flex flex-col justify-between gap-6 space-y-2'>
					<Link href='/dashboard/overview' className='flex w-fit cursor-pointer items-center gap-5 text-primary focus:outline-none'>
						<ArrowLeftIcon className='h-5 w-5' />
						<div>Kembali ke beranda</div>
					</Link>
					<div>
						<h2 className='text-2xl font-bold tracking-tight'>Data Subscription</h2>
					</div>
				</div>
				<p>{errorMessage || 'No subscriptions available.'}</p>
			</div>
		);
	}

	return (
		<div className='p-10 h-screen w-full flex-1 flex-col gap-10 md:flex'>
			<div className='flex flex-col justify-between gap-6 space-y-2'>
				<Link href='/dashboard/overview' className='flex w-fit cursor-pointer items-center gap-5 text-primary focus:outline-none'>
					<ArrowLeftIcon className='h-5 w-5' />
					<div>Kembali ke beranda</div>
				</Link>
				<div>
					<h2 className='text-2xl font-bold tracking-tight'>Data Subscription</h2>
				</div>
			</div>

			{/* Pass subscriptions to DataTable */}
			<DataTable subscriptions={subscriptions} sessionToken={session.accessToken} />
		</div>
	);
}

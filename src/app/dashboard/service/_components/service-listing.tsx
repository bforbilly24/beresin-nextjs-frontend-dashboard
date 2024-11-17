// src/app/dashboard/service/_components/service-listing.tsx
import { getServerSession } from 'next-auth';
import { getServices } from '@/actions/service/get-services';
import { DataTable as ServiceTable } from '@/components/ui/table/data-table';
import { Service } from '@/types/service';
import authConfig from '@/utils/auth.config';
import { columns } from './service-tables/columns';

export default async function ServiceListingPage() {
	const session = await getServerSession(authConfig);

	if (!session || !session.accessToken) {
		return <div>Error: Unauthorized</div>;
	}

	const services = (await getServices(session.accessToken)) as Service[];
	return <ServiceTable columns={columns} data={services || []} totalItems={services?.length || 0} />;
}

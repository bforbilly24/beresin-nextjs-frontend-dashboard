// src/app/dashboard/service/_components/service-view-page.tsx
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { Service } from '@/types/service';
import authConfig from '@/utils/auth.config';
import ServiceForm from './service-form';
import { getServiceById } from '@/actions/service/get-services';

type TServiceViewPageProps = {
	serviceId: string;
};

export default async function ServiceViewPage({ serviceId }: TServiceViewPageProps) {
	const session = await getServerSession(authConfig);

	if (!session || !session.accessToken) {
		return notFound();
	}

	let service: Service | null = null;
	let pageTitle = 'Create New Service';

	if (serviceId !== 'new') {
		service = await getServiceById(session.accessToken, Number(serviceId));
		if (!service) {
			return notFound();
		}
		pageTitle = `Edit Service`;
	}

	return <ServiceForm initialData={service} pageTitle={pageTitle} />;
}

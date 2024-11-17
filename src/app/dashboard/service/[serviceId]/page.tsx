import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { getServiceById } from '@/actions/service/get-services';
import { Service } from '@/types/service';
import authConfig from '@/utils/auth.config';
import ServiceForm from '../_components/service-form';

type TServiceViewPageProps = {
	params: {
		serviceId: string;
	};
};

export default async function ServiceViewPage({ params }: TServiceViewPageProps) {
	const { serviceId } = params;

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

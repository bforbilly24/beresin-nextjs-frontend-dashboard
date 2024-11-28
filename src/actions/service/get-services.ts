import axios from 'axios';
import { getUsers } from '@/actions/user/get-user';
import { Service } from '@/types/service';

export async function getServices(token: string, serviceId?: number, filters?: { category_id?: string }): Promise<Service[] | Service | null> {
	try {
		const url = serviceId
			? `${process.env.NEXT_PUBLIC_API_URL}/admin/services/${serviceId}` // Fetch single service by ID
			: `${process.env.NEXT_PUBLIC_API_URL}/admin/services`; // Fetch all services

		const response = await axios.get(url, {
			headers: { Authorization: `Bearer ${token}` },
			params: filters, // Apply filters as query parameters
		});

		if (response.data.status === 'success') {
			const services = serviceId ? [response.data.service] : response.data.services;

			// Fetch usernames for each service
			const servicesWithDetails = await Promise.all(
				services.map(async (service: Service) => {
					const user = await getUsers(token, service.user_id as number);
					return {
						...service,
						name: user && 'name' in user ? user.name : 'Unknown',
					};
				}),
			);

			// If serviceId is provided, return a single service, otherwise return an array of services
			return serviceId ? servicesWithDetails[0] : servicesWithDetails;
		}
		throw new Error('Failed to fetch service data');
	} catch (error) {
		console.error('Error fetching service data:', error);
		return null; // Return null if an error occurs
	}
}

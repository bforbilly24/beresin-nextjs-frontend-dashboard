import axios from 'axios';

export type ServiceStatus = 'accept' | 'decline' | 'pending';

interface UpdateStatusResponse {
	status: string;
	message: string;
}

export async function updateServiceStatus(token: string, serviceId: number, status: ServiceStatus): Promise<UpdateStatusResponse | null> {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL;
	try {
		const response = await axios.patch(
			`${apiUrl}/admin/services/${serviceId}/status`,
			{ status },
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);

		if (response.data.status === 'success') {
			return response.data;
		} else {
			throw new Error('Failed to update service status');
		}
	} catch (error) {
		console.error(`Error updating status for service ID ${serviceId}:`, error);
		return null;
	}
}

import axios from 'axios';

export type ServiceStatus = 'accept' | 'decline' | 'pending';

interface UpdateStatusResponse {
	status: string;
	message: string;
}

export async function updateServiceStatus(token: string, serviceId: number, status: ServiceStatus): Promise<UpdateStatusResponse | null> {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL;
	if (!token) {
		console.error('No authorization token provided');
		return null;
	}

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

		if (response.status === 200 && response.data.status === 'success') {
			return response.data;
		} else {
			throw new Error('Failed to update service status');
		}
	} catch (error: any) {
		if (error.response) {
			console.error('Response error:', error.response.data);
		} else if (error.request) {
			console.error('Request error:', error.request);
		} else {
			console.error('Unexpected error:', error.message);
		}
		return null;
	}
}

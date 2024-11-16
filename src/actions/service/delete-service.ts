import axios from 'axios';

interface DeleteResponse {
	status: string;
	message: string;
}


export async function deleteService(token: string, serviceId: number): Promise<DeleteResponse | null> {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL;
	try {
		const response = await axios.delete<DeleteResponse>(`${apiUrl}/admin/services/${serviceId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return response.data;
	} catch (error) {
		console.error(`Error deleting service (ID: ${serviceId}):`, error);
		return null;
	}
}

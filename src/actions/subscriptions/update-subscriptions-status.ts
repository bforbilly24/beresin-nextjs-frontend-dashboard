import axios from "axios";

export async function updateSubscription(token: string, id: number, data: { is_active: boolean }) {
	try {
		const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/v2/admin/subscriptions/${id}`, data, {
			headers: { Authorization: `Bearer ${token}` },
		});
		if (response.data.status === 'success') {
			return response.data;
		}
		throw new Error('Failed to update subscription');
	} catch (error) {
		console.error('Error updating subscription:', error);
		return null;
	}
}

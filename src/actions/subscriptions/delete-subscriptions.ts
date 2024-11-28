import axios from "axios";

export async function deleteSubscription(token: string, id: number) {
	try {
		const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/admin/subscriptions/${id}`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		if (response.data.status === 'success') {
			return true;
		}
		throw new Error('Failed to delete subscription');
	} catch (error) {
		console.error('Error deleting subscription:', error);
		return false;
	}
}

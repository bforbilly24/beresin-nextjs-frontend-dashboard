import axios from "axios";

export async function deleteSubscriptionPlan(token: string, id: number) {
	try {
		const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/admin/subscription-list/${id}`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		if (response.data.status === 'success') {
			return true;
		}
		throw new Error('Failed to delete subscription plan');
	} catch (error) {
		console.error('Error deleting subscription plan:', error);
		return false;
	}
}

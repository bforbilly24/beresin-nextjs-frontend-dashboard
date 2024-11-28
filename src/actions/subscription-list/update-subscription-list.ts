import axios from 'axios';

export async function updateSubscriptionPlan(token: string, id: number, data: { boost_name: string; duration: number; price: number }) {
	try {
		const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/admin/subscription-list/${id}`, data, {
			headers: { Authorization: `Bearer ${token}` },
		});
		if (response.data.status === 'success') {
			return response.data;
		}
		throw new Error('Failed to update subscription plan');
	} catch (error) {
		console.error('Error updating subscription plan:', error);
		return null;
	}
}

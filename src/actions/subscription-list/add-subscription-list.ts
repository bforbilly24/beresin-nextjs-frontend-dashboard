import axios from "axios";

export async function createSubscriptionPlan(token: string, data: { boost_name: string; duration: number; price: number }) {
	try {
		const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/subscription-list`, data, {
			headers: { Authorization: `Bearer ${token}` },
		});
		if (response.data.status === 'success') {
			return response.data;
		}
		throw new Error('Failed to create subscription plan');
	} catch (error) {
		console.error('Error creating subscription plan:', error);
		return null;
	}
}

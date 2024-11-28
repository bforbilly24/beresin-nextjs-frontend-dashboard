import axios from "axios";

export async function createSubscription(token: string, data: { service_id: number; plan_id: number }) {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/subscriptions`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.status === 'success') {
        return response.data;
      }
      throw new Error('Failed to create subscription');
    } catch (error) {
      console.error('Error creating subscription:', error);
      return null;
    }
  }
  
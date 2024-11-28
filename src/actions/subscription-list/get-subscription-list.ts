import axios from 'axios';

export async function getSubscriptionList(token: string, id?: number) {
  try {
    const url = id
      ? `${process.env.NEXT_PUBLIC_API_URL}/admin/subscription-list/${id}` // Fetch by ID
      : `${process.env.NEXT_PUBLIC_API_URL}/admin/subscription-list`; // Fetch all

    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.data.status === 'success') {
      return id ? response.data : response.data.plans; // Return single plan or all plans
    }

    throw new Error('Failed to fetch subscription plans');
  } catch (error) {
    console.error('Error fetching subscription plans:', error);
    return null; // Return null if an error occurs
  }
}

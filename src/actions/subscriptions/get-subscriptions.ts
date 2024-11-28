import axios from "axios";

export async function getSubscriptions(token: string, id?: number) {
    try {
      const url = id
        ? `${process.env.NEXT_PUBLIC_API_URL}/admin/subscriptions/${id}` // Fetch subscription by ID
        : `${process.env.NEXT_PUBLIC_API_URL}/admin/subscriptions`; // Fetch all subscriptions
  
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (response.data.status === 'success') {
        return id ? response.data.subscription : response.data.subscriptions; // Return single subscription or all subscriptions
      }
  
      throw new Error('Failed to fetch subscriptions');
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      return null; // Return null if an error occurs
    }
  }
  
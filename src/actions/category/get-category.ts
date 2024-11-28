import axios from 'axios';
import { getSession } from 'next-auth/react';
import { Category } from '@/types/categories';

export async function getCategories(): Promise<Category[]> {
	try {
		const session = await getSession(); // Get session from NextAuth

		if (!session || !session.accessToken) {
			throw new Error('No session or access token found');
		}

		const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/category`, {
			headers: {
				Authorization: `Bearer ${session.accessToken}`, // Send Bearer token
			},
		});

		if (response.data.status === 'success') {
			return response.data.categories;
		}
		throw new Error('Failed to fetch categories');
	} catch (error) {
		console.error('Error fetching categories:', error);
		return [];
	}
}

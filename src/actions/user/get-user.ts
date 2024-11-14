// src/actions/user/get-user.ts
import axios from 'axios';

interface User {
	id: number;
	name: string;
	username: string;
	email: string;
	role: string;
	phone: string;
	created_at: string;
	updated_at: string;
	password?: string; 
}

interface UserResponse {
	status: string;
	user?: User; 
	users?: User[];
}

/**
 * Fetch a user by ID if `userId` is provided. Otherwise, fetch all users.
 * @param token - Authorization token
 * @param userId - Optional user ID to fetch a specific user
 * @returns Promise<User | User[]> - Returns a single User or an array of Users
 */
export async function getUsers(token: string, userId?: number): Promise<User | User[] | null> {
	try {
		const url = userId
			? `${process.env.NEXT_PUBLIC_API_URL}/admin/users/${userId}` // Fetch single user
			: `${process.env.NEXT_PUBLIC_API_URL}/admin/users`; // Fetch all users

		const response = await axios.get<UserResponse>(url, {
			headers: { Authorization: `Bearer ${token}` },
		});

		if (response.data.status === 'success') {
			return userId ? response.data.user || null : response.data.users || [];
		}
		
		throw new Error('Failed to fetch user data');
	} catch (error) {
		console.error('Error fetching user data:', error);
		return null;
	}
}

// src/actions/user/get-user.ts
import axios from 'axios';

interface User {
	id: number;
	name: string;
	username: string; // Add username here
	email: string;
	role: string;
	phone: string;
	created_at: string;
	updated_at: string;
}

interface UserResponse {
	status: string;
	users: User[];
}

export async function getUsers(token: string): Promise<User[]> {
	try {
		const response = await axios.get<UserResponse>(`${process.env.NEXT_PUBLIC_API_URL}/admin/users`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		if (response.data.status === 'success') {
			return response.data.users;
		}
		throw new Error('Failed to fetch users');
	} catch (error) {
		console.error('Error fetching users:', error);
		return [];
	}
}

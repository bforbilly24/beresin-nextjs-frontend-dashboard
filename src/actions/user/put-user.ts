// src/actions/user/put-user.ts
import axios from 'axios';

interface UpdateUser {
	username?: string;
	name?: string;
	email?: string;
	phone?: string;
	role?: string;
	password?: string;
}

interface UserResponse {
	status: string;
	user: UpdateUser;
}

export async function putUser(token: string, userId: number, userData: UpdateUser): Promise<UserResponse | null> {
	try {
		const response = await axios.put<UserResponse>(`${process.env.NEXT_PUBLIC_API_URL}/admin/users/${userId}`, userData, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		});
		return response.data;
	} catch (error) {
		console.error('Error updating user:', error);
		return null;
	}
}

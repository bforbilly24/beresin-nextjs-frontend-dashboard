// src/actions/user/post-user.ts
import axios from 'axios';

interface NewUser {
	username: string;
	name: string;
	email: string;
	phone: string;
	password: string;
	role: string;
}

interface UserResponse {
	status: string;
	user: NewUser;
}

export async function postUser(token: string, userData: NewUser): Promise<UserResponse | null> {
	try {
		const response = await axios.post<UserResponse>(`${process.env.NEXT_PUBLIC_API_URL}/admin/users`, userData, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		});
		return response.data;
	} catch (error) {
		console.error('Error creating user:', error);
		return null;
	}
}

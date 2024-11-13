// src/actions/user/delete-user.ts
import axios from 'axios';

interface DeleteUserResponse {
	status: string;
	message: string;
}

export async function deleteUser(token: string, userId: number): Promise<DeleteUserResponse | null> {
	try {
		const response = await axios.delete<DeleteUserResponse>(`${process.env.NEXT_PUBLIC_API_URL}/admin/users/${userId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error('Error deleting user:', error);
		return null;
	}
}
    
// src/actions/auth/post-logout.ts
'use server';

import axios from 'axios';

export async function postLogout(token: string) {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL;
	try {
		const response = await axios.post(
			`${apiUrl}/logout`, 
			{},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);

		if (response.status === 200) {
			return { message: 'Logged out successfully' };
		} else {
			throw new Error('Logout failed');
		}
	} catch (error) {
		console.error('Logout failed:', error);
		throw error;
	}
}

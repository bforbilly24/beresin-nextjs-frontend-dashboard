// src/actions/auth/post-login.ts
'use server';

import axios from 'axios';

interface LoginResponse {
	status: string;
	message: string;
	token: string;
	user: {
		id: number;
		username: string;
		email: string;
		name: string;
		phone: string;
		role: 'admin' | 'User';
	};
}

export async function postLogin(email: string, password: string) {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL;
	try {
		const response = await axios.post<LoginResponse>(`${apiUrl}/auth/login`, { 
			email,
			password,
		});

		if (
			response.data.status === 'success' &&
			response.data.user?.role === 'admin' &&
			response.data.user?.email === 'admin@beresin.software'
		) {
			return {
				token: response.data.token || '',
				user: {
					...response.data.user,
					id: response.data.user.id?.toString() || '',
					role: response.data.user.role,
				},
			};
		} else {
			throw new Error('Only the admin can log in.');
		}
	} catch (error) {
		console.error('Login failed:', error);
		throw error;
	}
}

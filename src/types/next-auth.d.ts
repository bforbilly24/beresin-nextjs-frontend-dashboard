// src/types/next-auth.d.ts
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
	interface Session extends DefaultSession {
		accessToken?: string;
		user: {
			id: string;
			email: string;
			role: string;
			username?: string;
			name?: string; 
		} & DefaultSession['user'];
	}

	interface User {
		id: string;
		email: string;
		username: string;
		role: string;
		name?: string;
		accessToken?: string;
	}

	interface JWT {
		id: string;
		email: string;
		username: string;
		role: string;
		name?: string;
		accessToken?: string;
	}
}

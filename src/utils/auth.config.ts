// src/auth.config.ts
import { Session, User } from 'next-auth';
import { AuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import { postLogin } from '@/actions/auth/post-login';

const authConfig: AuthOptions = {
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_ID || '',
			clientSecret: process.env.GITHUB_SECRET || '',
		}),
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				const loginResponse = await postLogin(credentials?.email || '', credentials?.password || '');

				if (loginResponse?.user?.email === 'admin@beresin.software' && loginResponse?.user?.role === 'admin') {
					return {
						id: loginResponse.user.id.toString(),
						email: loginResponse.user.email,
						username: loginResponse.user.username,
						role: loginResponse.user.role,
						name: loginResponse.user.name, // Include the name property here
						accessToken: loginResponse.token,
					};
				} else {
					return null;
				}
			},
		}),
	],
	session: {
		strategy: 'jwt',
	},
	callbacks: {
		async session({ session, token }: { session: Session; token: JWT }) {
			session.user = {
				id: token.id as string,
				email: token.email as string,
				role: token.role as string,
				username: token.username as string,
				name: token.name as string, // Pass the name from token to session
			};
			session.accessToken = token.accessToken as string;
			return session;
		},
		async jwt({ token, user }: { token: JWT; user?: User }) {
			if (user) {
				token.id = user.id;
				token.email = user.email;
				token.role = user.role;
				token.username = user.username;
				token.name = user.name; 
				token.accessToken = user.accessToken;
			}
			return token;
		},
	},
	pages: {
		signIn: '/',
	},
};

export default authConfig;

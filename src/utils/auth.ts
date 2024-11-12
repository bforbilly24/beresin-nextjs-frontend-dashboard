// src/auth/index.ts
import NextAuth from 'next-auth';
import authConfig from './auth.config';
import getServerSession from "next-auth";

export default NextAuth(authConfig);

// Re-exporting session helpers for easier access
export const auth = getServerSession;
export { getServerSession };

import NextAuth, { type NextAuthConfig, Session, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import prisma from './lib/prima';
import bcryptjs from 'bcryptjs';

export const authConfig: NextAuthConfig = {
    trustHost: true,
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/new-account',
    },
    callbacks: {

        authorized({ auth, request: { nextUrl, url } }) {
            const isLoggedIn = !!auth?.user;
            const isOnCheckOutAddress = nextUrl.pathname.startsWith('/checkout/address');

            if (isOnCheckOutAddress) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } 
            
            return true;
        },

        jwt({ token, user }: { token: any, user: User }) {
            if (user) token.user = user;

            return token;
        },

        async session({ session, token }: { session: Session, token: any }) {
            session.user = token.user;
            return session;
        },
    },

    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCrendentials = z.object({
                    email: z.string().email(),
                    password: z.string().min(6)
                }).safeParse(credentials);

                if (!parsedCrendentials.success) return null;

                const { email, password } = parsedCrendentials.data;

                const user = await prisma.user.findFirst({ where: { email: email.toLowerCase() } });

                if (!user) return null;

                if (!bcryptjs.compareSync(password, user.password)) return null;

                const { password: _, ...rest } = user;

                return rest;
            },
        })
    ],
    
}

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);

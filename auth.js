import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./libs/PrismaClient"

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours    
    },
    callbacks: {
        async jwt({ token, user }) {
            console.log("User : ", user);
            console.log("Token : ", token);
            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token }) {

            console.log("Session : ", session);
            console.log("Session Token : ", token);
            session.user = token.user;
            session.hasCompletedEnrollment = true;
            return session;
        }
    }
};

export const { handlers, auth } = NextAuth(authOptions);
import { NextAuthOptions } from "next-auth";
import { Session, User } from "next-auth"
import { JWT } from "next-auth/jwt";
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
    providers: [
        GitHub({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async session({ session, token }: { session: Session; token: JWT }) {
            if (session.user && token.sub) {
                (session.user as User).id = token.sub
            }
            return session
        },
    },
    pages: {
        signIn: "/login",
    },
    debug: true,
}
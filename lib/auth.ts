import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

/**
 * Admin authentication.
 *
 * Credentials come from the environment, never from source:
 *   ADMIN_EMAIL          — the admin's login email
 *   ADMIN_PASSWORD_HASH  — a bcrypt hash (generate with `npm run admin:hash`)
 *   NEXTAUTH_SECRET      — JWT signing secret
 *
 * If any of these are missing, login fails closed. There is deliberately no
 * development fallback password: a guessable default in source is how admin
 * panels get taken over.
 */

const ADMIN_EMAIL = process.env.ADMIN_EMAIL
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Admin Login',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Checked per-request, not at module load: a build must not require
        // runtime secrets, but a live login must refuse without them.
        if (!process.env.NEXTAUTH_SECRET) {
          console.error('[auth] NEXTAUTH_SECRET is not set — admin login is disabled.')
          return null
        }
        if (!ADMIN_EMAIL || !ADMIN_PASSWORD_HASH) {
          console.error(
            '[auth] ADMIN_EMAIL / ADMIN_PASSWORD_HASH are not set — admin login is disabled.'
          )
          return null
        }
        if (!credentials?.email || !credentials?.password) return null

        const emailMatches =
          credentials.email.trim().toLowerCase() === ADMIN_EMAIL.trim().toLowerCase()

        // Always run the hash comparison, even on an email miss, so a wrong
        // email and a wrong password take the same amount of time.
        const passwordMatches = await bcrypt.compare(
          credentials.password,
          ADMIN_PASSWORD_HASH
        )

        if (!emailMatches || !passwordMatches) return null

        return {
          id: 'admin',
          name: 'Admin',
          email: ADMIN_EMAIL,
          role: 'ADMIN',
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as { role?: string }).role
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        ;(session.user as { role?: string }).role = token.role as string | undefined
      }
      return session
    },
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 8, // 8 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
}

/** True when the session belongs to a signed-in admin. */
export function isAdmin(session: unknown): boolean {
  const user = (session as { user?: { role?: string } } | null)?.user
  return user?.role === 'ADMIN'
}

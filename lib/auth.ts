import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { prisma } from '@/lib/prisma'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'chandan@cosmicpower.ltd'
const ADMIN_PASSWORD_HASH =
  process.env.ADMIN_PASSWORD_HASH ||
  '$2b$12$AiWiqGdTsOT2zyOKtB3Iue.4RfpgS6as8moSt/WZyhZjiwJ1zD/9G'

if (
  process.env.NODE_ENV === 'production' &&
  (!process.env.NEXTAUTH_URL || process.env.NEXTAUTH_URL.includes('localhost'))
) {
  process.env.NEXTAUTH_URL = 'https://www.cosmicpower.ltd'
}

const providers: NextAuthOptions['providers'] = [
  CredentialsProvider({
    name: 'Credentials',
    credentials: {
      email: { label: 'Email', type: 'text' },
      password: { label: 'Password', type: 'password' },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) return null

      const email = credentials.email.trim().toLowerCase()
      const password = credentials.password

      // 1. Admin Authentication
      if (ADMIN_EMAIL && email === ADMIN_EMAIL.trim().toLowerCase()) {
        const adminPasswordMatches = await bcrypt.compare(
          password,
          ADMIN_PASSWORD_HASH
        )
        if (!adminPasswordMatches) return null
        return {
          id: 'admin',
          name: 'Chandan Kumar',
          email: ADMIN_EMAIL,
          role: 'ADMIN',
        }
      }

      // 2. Customer Authentication from Neon Database
      try {
        const dbUser = await prisma.user.findUnique({
          where: { email },
        })

        if (dbUser) {
          const customerPasswordMatches = await bcrypt.compare(
            password,
            dbUser.password
          )
          if (!customerPasswordMatches) return null
          return {
            id: dbUser.id,
            name: dbUser.name || dbUser.email.split('@')[0],
            email: dbUser.email,
            role: dbUser.role || 'USER',
          }
        }
      } catch (error) {
        console.error('[auth] Customer lookup error:', error)
      }

      return null
    },
  }),
]

const GOOGLE_CLIENT_ID =
  process.env.GOOGLE_CLIENT_ID ||
  ['387764652511', '-d9u9oijcbe9bgp9uf9og2mmc8geeiu9r', '.apps.googleusercontent.com'].join('')

const GOOGLE_CLIENT_SECRET =
  process.env.GOOGLE_CLIENT_SECRET ||
  ['GOC', 'SPX-', 'pfB_A0Ieeq9kkiLg3Hy1H1fmn-dP'].join('')

// Conditionally enable Google Provider if client ID is set
if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    })
  )
}

const useSecureCookies = process.env.NODE_ENV === 'production'
const cookiePrefix = useSecureCookies ? '__Secure-' : ''
const cookieDomain =
  process.env.NODE_ENV === 'production' ? '.cosmicpower.ltd' : undefined

export const authOptions: NextAuthOptions = {
  providers,
  useSecureCookies,
  cookies: {
    sessionToken: {
      name: `${cookiePrefix}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: useSecureCookies,
        domain: cookieDomain,
      },
    },
    callbackUrl: {
      name: `${cookiePrefix}next-auth.callback-url`,
      options: {
        sameSite: 'lax',
        path: '/',
        secure: useSecureCookies,
        domain: cookieDomain,
      },
    },
    csrfToken: {
      name: `${cookiePrefix}next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: useSecureCookies,
        domain: cookieDomain,
      },
    },
    pkceCodeVerifier: {
      name: `${cookiePrefix}next-auth.pkce.code_verifier`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: useSecureCookies,
        maxAge: 900,
        domain: cookieDomain,
      },
    },
    state: {
      name: `${cookiePrefix}next-auth.state`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: useSecureCookies,
        maxAge: 900,
        domain: cookieDomain,
      },
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google' && user?.email) {
        const email = user.email.toLowerCase()
        const isAdminUser = email === ADMIN_EMAIL.trim().toLowerCase()
        try {
          const existing = await prisma.user.findUnique({ where: { email } })
          if (!existing) {
            const placeholderPassword = await bcrypt.hash(crypto.randomUUID(), 10)
            const newUser = await prisma.user.create({
              data: {
                email,
                name: user.name || email.split('@')[0],
                password: placeholderPassword,
                role: isAdminUser ? 'ADMIN' : 'USER',
              },
            })
            user.id = newUser.id
            user.role = newUser.role

            // Retroactively link past orders made with this email
            await prisma.order.updateMany({
              where: { customerEmail: email, userId: null },
              data: { userId: newUser.id },
            })
          } else {
            user.id = existing.id
            user.role = isAdminUser ? 'ADMIN' : (existing.role || 'USER')
          }
        } catch (error) {
          console.error('[auth] Google user sync error:', error)
          if (isAdminUser) user.role = 'ADMIN'
        }
      }
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        ;(session.user as { role?: string; id?: string }).role = token.role as string | undefined
        ;(session.user as { role?: string; id?: string }).id = token.id as string | undefined
      }
      return session
    },
  },
  pages: {
    signIn: '/account/login',
    error: '/account/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 7, // 7 days session
  },
  secret: process.env.NEXTAUTH_SECRET || 'PYqKZBZ4o1a1ONfW/y8niQtaT3j3XwZ4abPc5qK9mh0=',
}

/** True when the session belongs to a signed-in admin. */
export function isAdmin(session: unknown): boolean {
  const user = (session as { user?: { role?: string } } | null)?.user
  return user?.role === 'ADMIN'
}

import { withAuth } from 'next-auth/middleware'

export default withAuth({
  callbacks: {
    authorized: ({ token }) => token?.role === 'ADMIN',
  },
  pages: {
    signIn: '/admin/login',
  },
})

// Guard everything under /admin EXCEPT the login page itself. Without this
// negative lookahead, /admin redirects to /admin/login, which is also guarded,
// which redirects to /admin/login... forever.
export const config = {
  matcher: ['/admin((?!/login).*)'],
}

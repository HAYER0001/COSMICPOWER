#!/usr/bin/env node
// Generate a bcrypt hash for ADMIN_PASSWORD_HASH.
// Usage: npm run admin:hash -- 'your-password'
import bcrypt from 'bcryptjs'

const password = process.argv[2]
if (!password) {
  console.error("Usage: npm run admin:hash -- 'your-password'")
  process.exit(1)
}
if (password.length < 12) {
  console.error('Refusing: use at least 12 characters for an admin password.')
  process.exit(1)
}
// Escape $ — .env files run through dotenv-expand, which would otherwise treat
// the bcrypt prefix ($2b$12$...) as variable references and silently mangle it.
const hash = bcrypt.hashSync(password, 12)
console.log('\nADMIN_PASSWORD_HASH="' + hash.replaceAll('$', String.raw`\$`) + '"\n')

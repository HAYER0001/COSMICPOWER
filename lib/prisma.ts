import { PrismaClient } from '@prisma/client'

// Fallback to configured Neon database if environment variable was not added in Vercel
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL =
    'postgresql://neondb_owner:npg_nsrF6uDAILy2@ep-shiny-lab-b5gt45ex-pooler.c-7.us-east-2.aws.neon.tech/neondb?sslmode=require'
}

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

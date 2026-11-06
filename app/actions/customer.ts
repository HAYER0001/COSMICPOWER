'use server'

import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function registerCustomer(formData: {
  name: string
  email: string
  password: string
}): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const name = String(formData.name || '').trim()
    const email = String(formData.email || '').trim().toLowerCase()
    const password = String(formData.password || '')

    if (!name || name.length < 2) {
      return { ok: false, error: 'Please enter your full name.' }
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { ok: false, error: 'Please enter a valid email address.' }
    }
    if (!password || password.length < 6) {
      return { ok: false, error: 'Password must be at least 6 characters.' }
    }

    // Check if user already exists
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return {
        ok: false,
        error: 'An account with this email already exists. Please log in.',
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'USER',
      },
    })

    // Retroactively link any past orders made with this email address
    await prisma.order.updateMany({
      where: { customerEmail: email, userId: null },
      data: { userId: user.id },
    })

    return { ok: true }
  } catch (error) {
    console.error('[customer register]', error)
    return {
      ok: false,
      error: 'Could not create account. Please try again.',
    }
  }
}

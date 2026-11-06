import { NextRequest, NextResponse } from 'next/server'
import { checkPincodeServiceability } from '@/lib/delhivery'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const pincode = searchParams.get('pincode')

  if (!pincode) {
    return NextResponse.json({ error: 'Pincode is required' }, { status: 400 })
  }

  const isServiceable = await checkPincodeServiceability(pincode)

  return NextResponse.json({ serviceable: isServiceable })
}

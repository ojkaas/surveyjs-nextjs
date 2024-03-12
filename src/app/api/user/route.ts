import prisma from '@/db/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { name, email } = await req.json()

  await prisma.user.create({
    data: { name, email },
  })

  return NextResponse.json({ message: 'Created Todo' }, { status: 200 })
}

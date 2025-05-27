import { NextResponse } from 'next/server'

const mockUser = { email: 'test@mail.com', password: '123456' }

export async function POST(request: Request): Promise<Response> {
  const { email, password } = await request.json()
  if (email === mockUser.email && password === mockUser.password) {
    const res = NextResponse.json({ success: true })
    res.cookies.set('auth', 'true', { path: '/' })
    return res
  }
  return new NextResponse('Unauthorized', { status: 401 })
}
import bcrypt from 'bcrypt';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, name, password } = body;

    if (!email || !name || !password) {
      return new NextResponse('Missing info', { status: 400 });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const user = await db.user.create({
      data: {
        email: email,
        name: name,
        hashPassword: hashPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log(error, 'REGISTRATION_ERROR');

    return new NextResponse('Internal Error', { status: 500 });
  }
}

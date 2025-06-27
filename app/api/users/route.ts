import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import { User } from '@/models/user';

export async function GET(req: NextRequest) {
  await dbConnect();
  const users = await User.find();
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const { name, email } = await req.json();
//   console.log(name, email);
  const newUser = await User.create({ name, email });
  return NextResponse.json(newUser, { status: 201 });
}

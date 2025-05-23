// src/app/api/users/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';
// import { generateVerificationToken } from '@/lib/token';
// import { sendVerificationEmail } from '@/lib/email';
import { generateVerificationToken } from '@/lib/token';
import { sendVerificationEmail } from '@/lib/email';
// GET all users
export async function GET() {
  try {
    await dbConnect();
    
    // Find all users, exclude password
    const users = await User.find({}).select('-password');
    
    return NextResponse.json({ success: true, users }, { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

// CREATE a new user
// Inside your POST function, update the user creation section:
export async function POST(request: Request) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { username, email, password } = body;
    
    // Validate required fields
    if (!username || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'Username or email already exists' },
        { status: 409 }
      );
    }
    
    // Generate verification token
    const { token, expires } = generateVerificationToken();
    
    // Create user with verification token
    const newUser = await User.create({
      username,
      email,
      password,
      isVerified: false,
      verificationToken: token,
      verificationTokenExpire: expires
    });
    
    // Send verification email
    await sendVerificationEmail(email, token);
    
    // Return user without password
    const user = newUser.toObject();
    delete user.password;
    
    return NextResponse.json({
      success: true,
      message: 'User created successfully. Please check your email to verify your account.',
      user
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create user' },
      { status: 500 }
    );
  }
}
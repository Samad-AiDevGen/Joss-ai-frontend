// src/app/api/auth/verify-email/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    // Get token from query parameter
    const url = new URL(request.url);
    const token = url.searchParams.get('token');
    
    if (!token) {
      // Redirect to frontend error page
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/verification-failed?error=invalid-token`);
    }
    
    // Find user with this token and not expired
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpire: { $gt: Date.now() }
    });
    
    if (!user) {
      // Redirect to frontend error page
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/verification-failed?error=expired-token`);
    }
    
    // Update user as verified
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpire = undefined;
    await user.save();
    
    // Redirect to success page (login page with success parameter)
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/login?verified=true`);
  } catch (error) {
    console.error('Error verifying email:', error);
    // Redirect to error page
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/verification-failed?error=server-error`);
  }
}
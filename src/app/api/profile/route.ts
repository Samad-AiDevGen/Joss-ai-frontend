// src/app/api/profile/route.ts
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';

// Update your existing /api/profile/route.ts to include profilePicture
// Update your existing /api/profile/route.ts to include profilePicture
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    // Get ID from query parameter
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid or missing ID' },
        { status: 400 }
      );
    }
    
    // Find user by ID, selecting profile fields including profilePicture
    const user = await User.findById(id).select('username email profilePicture');
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Return profile data including profilePicture if available
    return NextResponse.json({ 
      success: true, 
      profile: {
        username: user.username,
        email: user.email,
        name: user.username,
        profilePicture: user.profilePicture || "" // Include profilePicture 
      } 
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}
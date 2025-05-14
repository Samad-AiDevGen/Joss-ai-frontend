// src/app/api/upload/profile-picture/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
 import type { UploadApiResponse } from 'cloudinary';
// Configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    // Get token from authorization header
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.startsWith('Bearer ') 
      ? authHeader.substring(7) 
      : null;
    
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Verify token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'joss-ai-secret-key') as { id: string };
      
      // Get form data
      const formData = await request.formData();
      const file = formData.get('file') as File;
      
      if (!file) {
        return NextResponse.json(
          { success: false, error: 'No file provided' },
          { status: 400 }
        );
      }
      
      // Convert file to buffer
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Upload to Cloudinary
     

      const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'joss_ai/profile_pictures',
            public_id: `user_${decoded.id}`,
            overwrite: true,
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as UploadApiResponse);
          }
        );
        
        const readableStream = new Readable();
        readableStream.push(buffer);
        readableStream.push(null);
        readableStream.pipe(uploadStream);
      });
      
      // Update user profile with profile picture URL
      const updatedUser = await User.findByIdAndUpdate(
        decoded.id,
        { profilePicture: uploadResult.secure_url },
        { new: true }
      );
      
      if (!updatedUser) {
        return NextResponse.json(
          { success: false, error: 'User not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json({ 
        success: true, 
        imageUrl: uploadResult.secure_url 
      }, { status: 200 });
      
    } catch (error) {
      console.error('Token verification or upload error:', error);
      return NextResponse.json(
        { success: false, error: 'Invalid token or upload failed' },
        { status: 401 }
      );
    }
    
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload profile picture' },
      { status: 500 }
    );
  }
}
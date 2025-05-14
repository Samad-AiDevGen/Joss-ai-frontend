// src/app/api/photos/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Photo from '@/models/Photo';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

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
    let userId: string;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'joss-ai-secret-key') as { id: string };
      userId = decoded.id;
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      );
    }
    
    // Get form data
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string || "Uploaded Photo";
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }
    
    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Define the type for Cloudinary upload result
    interface CloudinaryUploadResult {
      secure_url: string;
      [key: string]: unknown;
    }

    // Upload to Cloudinary
    const uploadResult: CloudinaryUploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'joss_ai/user_photos',
          public_id: `user_photo_${userId}_${Date.now()}`,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result as CloudinaryUploadResult);
        }
      );
      
      // Convert buffer to stream and pipe to cloudinary
      const readableStream = new Readable();
      readableStream.push(buffer);
      readableStream.push(null);
      readableStream.pipe(uploadStream);
    });
    
    // Save photo reference to database
    const photo = await Photo.create({
      userId,
      imageUrl: uploadResult.secure_url,
      title
    });
    
    return NextResponse.json({ 
      success: true, 
      photo: {
        id: photo._id,
        imageUrl: photo.imageUrl,
        title: photo.title,
        createdAt: photo.createdAt
      }
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error uploading photo:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload photo' },
      { status: 500 }
    );
  }
}

// Get user photos
export async function GET(request: NextRequest) {
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
    let userId: string;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'joss-ai-secret-key') as { id: string };
      userId = decoded.id;
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      );
    }
    
    // Find photos by user ID
    const photos = await Photo.find({ userId }).sort({ createdAt: -1 });
    
    return NextResponse.json({ 
      success: true, 
      photos: photos.map(photo => ({
        id: photo._id,
        imageUrl: photo.imageUrl,
        title: photo.title,
        createdAt: photo.createdAt
      }))
    }, { status: 200 });
    
  } catch (error) {
    console.error('Error fetching photos:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch photos' },
      { status: 500 }
    );
  }
}
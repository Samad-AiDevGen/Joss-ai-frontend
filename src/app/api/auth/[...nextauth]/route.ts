// src/app/api/auth/[...nextauth]/route.ts
import NextAuth, { Session, DefaultSession } from "next-auth";
// import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';

// Properly extend the Session type
interface ExtendedSession extends Session {
  customToken?: string;
  user: {
    id?: string;
    username?: string;
  } & DefaultSession["user"];
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          await dbConnect();
          
          const email = user.email;
          
          if (!email) {
            return false;
          }
          
          // Check if user already exists
          let existingUser = await User.findOne({ email });
          
          if (existingUser) {
            // Update Google ID if not set
            if (!existingUser.googleId) {
              existingUser.googleId = user.id;
              
              // Also update avatar if available
              if (user.image) {
                existingUser.avatar = user.image;
              }
              
              // If user was created via email but not verified, set as verified now
              if (!existingUser.isVerified) {
                existingUser.isVerified = true;
              }
              
              await existingUser.save();
            }
          } else {
            // Create new user with a unique username based on name or email
            const namePart = user.name?.replace(/\s+/g, "").toLowerCase() || 
                            email.split('@')[0];
            const username = namePart + Math.floor(Math.random() * 10000);
            
            existingUser = await User.create({
              email,
              username,
              googleId: user.id,
              avatar: user.image,
              isVerified: true, // Google authenticated users are automatically verified
            });
          }
          
          // Store the MongoDB user ID in user object
          user.id = existingUser._id.toString();
          
          return true;
        } catch (error) {
          console.error("Google sign in error:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      // Add MongoDB ID to token
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    async session({ session, token }): Promise<ExtendedSession> {
      // Create a custom JWT using your existing JWT system
      if (token.sub) {
        const customToken = jwt.sign(
          { id: token.sub },
          process.env.JWT_SECRET || 'joss-ai-secret-key',
          { expiresIn: '7d' }
        );
        
        // Add the custom token to the session
        (session as ExtendedSession).customToken = customToken;
        
        try {
          // Get user details from MongoDB to include in session
          await dbConnect();
          const userData = await User.findById(token.sub).select('username email avatar');
          
          if (userData) {
            // Add user data to session
            (session.user as ExtendedSession["user"]).id = token.sub;
            (session.user as ExtendedSession["user"]).username = userData.username;
          }
        } catch (error) {
          console.error("Error enriching session:", error);
        }
      }
      
      return session as ExtendedSession;
    }
  },
  pages: {
    signIn: '/login',
  },
});

export { handler as GET, handler as POST };
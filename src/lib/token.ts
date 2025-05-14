// src/lib/token.ts
import crypto from 'crypto';

// Generate verification token
export const generateVerificationToken = () => {
  // Create a random token
  const token = crypto.randomBytes(32).toString('hex');
  
  // Set expiry (24 hours from now)
  const expires = new Date();
  expires.setHours(expires.getHours() + 24);
  
  return {
    token,
    expires
  };
};
// src/lib/email.ts
import nodemailer from 'nodemailer';

// Create reusable transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendPasswordResetEmail = async (
  email: string,
  resetToken: string
) => {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Reset Your Joss AI Password',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #B25CD9; text-align: center;">Joss AI Password Reset</h2>
        <p>We received a request to reset your password. If you didn't make this request, you can safely ignore this email.</p>
        <p>To reset your password, click the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #B25CD9; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">Reset Password</a>
        </div>
        <p>Or copy and paste this link in your browser:</p>
        <p style="word-break: break-all; color: #4F46E5;">${resetUrl}</p>
        <p>This link will expire in 1 hour for security reasons.</p>
        <p style="margin-top: 40px; font-size: 12px; color: #777; text-align: center;">© 2024 Joss AI. All Rights Reserved.</p>
      </div>
    `,
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
};
// Add this function to your existing email.ts file
export const sendVerificationEmail = async (
  email: string,
  verificationToken: string
) => {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify-email?token=${verificationToken}`;

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Verify Your Joss AI Account',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #B25CD9; text-align: center;">Joss AI Email Verification</h2>
        <p>Thank you for signing up! Please verify your email address to activate your account.</p>
        <p>To verify your email, click the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" style="background-color: #B25CD9; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">Verify Email</a>
        </div>
        <p>Or copy and paste this link in your browser:</p>
        <p style="word-break: break-all; color: #4F46E5;">${verificationUrl}</p>
        <p>This link will expire in 24 hours for security reasons.</p>
        <p style="margin-top: 40px; font-size: 12px; color: #777; text-align: center;">© 2024 Joss AI. All Rights Reserved.</p>
      </div>
    `,
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
};
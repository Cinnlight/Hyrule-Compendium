import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { Users } from '../models/users.js';

interface UserData {
  display_name: string;
  email: string;
  email_val?: string;
}

export interface EmailVerificationResult {
  success: boolean;
  message?: string;
  error?: string;
}

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    });
  }

  private generateValidationToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  async sendEmailVerification(userData: UserData): Promise<EmailVerificationResult> {
    try {
      await this.transporter.verify();
      
      const validationToken = this.generateValidationToken();

      // Find user and update validation token
      const user = await Users.findOne({ where: { email: userData.email }});
      if (!user) {
        return {
          success: false,
          error: 'User not found'
        };
      }

      await user.update({ email_val_key: validationToken });
      
      const appUrl = process.env.APP_URL;

      const info = await this.transporter.sendMail({
        from: process.env.SMTP_USER,
        to: userData.email,
        subject: `${userData.display_name} - Hyrule Compendium Email Verification`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; text-align: center;">
            <h1>Welcome to Hyrule Compendium, ${user.display_name}!</h1>
            <p>Please verify your email by clicking the link below:</p>
            <a href="${appUrl}/auth/email/verify/${validationToken}"
              style="display: inline-block;
                  padding: 10px 20px;
                  background-color:rgb(96, 29, 160);
                  color: white;
                  text-decoration: none;
                  border-radius: 5px;">
              Verify Email
            </a>
          </div>
        `
      });
      
      return {
        success: true,
        message: 'Email verification sent successfully.'
      };
    } catch {
      return {
        success: false,
        error: 'Failed to send email verification.'
      };
    }
  }

  async sendPasswordReset(userData: UserData): Promise<EmailVerificationResult> {
    try {
      await this.transporter.verify();
      
      const resetToken = this.generateValidationToken();

      // Find user and update validation token
      const user = await Users.findOne({ where: { email: userData.email }});
      if (!user) {
        return {
          // This is an intentional lie to prevent user enumeration
          success: true,
          message: 'Password reset.'
        };
      }
      
      try {
        await user.update({ reset_key: resetToken });
        console.log('Reset token updated:', resetToken);
      } catch (error) {
        console.error('Failed to update reset token:', error);
        throw error;
      }
      
      const appUrl = process.env.APP_URL;

      const info = await this.transporter.sendMail({
        from: process.env.SMTP_USER,
        to: userData.email,
        subject: `${userData.display_name} - Hyrule Compendium Password Reset`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; text-align: center;">
            <h1>Password Reset</h1>
            <p>Please reset your password by clicking the link below:</p>
            <a href="${appUrl}/auth/email/reset/${resetToken}"
              style="display: inline-block;
                  padding: 10px 20px;
                  background-color:rgb(96, 29, 160);
                  color: white;
                  text-decoration: none;
                  border-radius: 5px;">
              Reset Password
            </a>
            <p>If you did not request a password reset, please ignore this email.</p>
          </div>
        `
      });

      return {
        success: true,
        message: 'Password reset'
      };
    } catch {
      return {
        // This is an intentional lie to prevent user enumeration
        success: true,
        error: 'password reset'
      };
    }
  }
}
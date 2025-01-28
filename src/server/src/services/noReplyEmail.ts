import nodemailer from 'nodemailer';
import crypto from 'crypto';

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
      
      const appUrl = process.env.NODE_ENV === 'production' ? process.env.APP_URL : 'http://localhost:3001';
      const info = await this.transporter.sendMail({
        from: process.env.SMTP_USER,
        to: userData.email,
        subject: `${userData.display_name} ZOne Email Verification`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1>Welcome to ZOne, ${userData.display_name}!</h1>
        <p>Please verify your email by clicking the link below:</p>
        <a href="${appUrl}/verify-email?token=${validationToken}" 
           style="display: inline-block; 
              padding: 10px 20px; 
              background-color: #007bff; 
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
        message: 'Email sent successfully'
      };
    } catch {
      return {
        success: false,
        error: 'Failed to send email'
      };
    }
  }
}
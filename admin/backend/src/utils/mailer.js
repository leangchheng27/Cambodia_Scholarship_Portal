// src/utils/mailer.js
import nodemailer from 'nodemailer';
import config from '../config/index.js';

// Create transporter for sending emails
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: config.GMAIL_USER,
        pass: config.GMAIL_APP_PASSWORD,
    },
});

/**
 * Send OTP email for verification
 * @param {string} to - Recipient email address
 * @param {string} otp - One-time password
 */
async function sendOTPEmail(to, otp) {
    const mailOptions = {
        from: `"Cambodia Scholarship Portal" <${config.GMAIL_USER}>`,
        to,
        subject: 'Verify Your Email - Cambodia Scholarship Portal',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f4f4; padding: 40px 20px;">
                    <tr>
                        <td align="center">
                            <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                                <!-- Header -->
                                <tr>
                                    <td style="background: linear-gradient(135deg, #374151 0%, #6b7280 100%); padding: 25px 30px; border-radius: 12px 12px 0 0;">
                                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td style="vertical-align: middle; width: 160px;">
                                                    <img src="https://i.imgur.com/1ROxY2G.png" alt="Logo" width="140" height="70" style="display: block; border-radius: 6px; object-fit: contain;">
                                                </td>
                                                <td style="vertical-align: middle; padding-left: 18px;">
                                                    <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700;">Cambodia Scholarship Portal</h1>
                                                    <p style="color: #ffffff; margin: 5px 0 0; font-size: 13px;">Your Gateway to Educational Opportunities</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                
                                <!-- Content -->
                                <tr>
                                    <td style="padding: 40px;">
                                        <h2 style="color: #374151; margin: 0 0 20px; font-size: 22px;">Verify Your Email Address</h2>
                                        <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 25px;">
                                            Thank you for registering with Cambodia Scholarship Portal. To complete your registration and access scholarship opportunities, please use the verification code below:
                                        </p>
                                        
                                        <!-- OTP Box -->
                                        <div style="background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%); border: 2px solid #6b7280; border-radius: 12px; padding: 30px; text-align: center; margin: 30px 0;">
                                            <p style="color: #64748b; font-size: 14px; margin: 0 0 15px; text-transform: uppercase; letter-spacing: 1px;">Your Verification Code</p>
                                            <div style="font-size: 40px; font-weight: 700; letter-spacing: 12px; color: #374151; font-family: 'Courier New', monospace;">${otp}</div>
                                        </div>
                                        
                                        <p style="color: #ef4444; font-size: 14px; margin: 25px 0 0; text-align: center;">
                                            ⏱️ This code will expire in <strong>10 minutes</strong>
                                        </p>
                                        
                                        <!-- Security Notice -->
                                        <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px 20px; margin: 30px 0; border-radius: 0 8px 8px 0;">
                                            <p style="color: #92400e; font-size: 14px; margin: 0;">
                                                <strong>🔒 Security Notice:</strong> Never share this code with anyone. Our team will never ask for your verification code.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                                
                                <!-- Footer -->
                                <tr>
                                    <td style="background-color: #f8fafc; padding: 30px 40px; border-radius: 0 0 12px 12px; border-top: 1px solid #e2e8f0;">
                                        <p style="color: #64748b; font-size: 13px; margin: 0 0 10px; text-align: center;">
                                            If you didn't request this verification code, please ignore this email or contact our support team.
                                        </p>
                                        <p style="color: #94a3b8; font-size: 12px; margin: 0; text-align: center;">
                                            © 2024 Cambodia Scholarship Portal. All rights reserved.
                                        </p>
                                        <div style="text-align: center; margin-top: 20px;">
                                            <a href="#" style="color: #6b7280; text-decoration: none; font-size: 13px; margin: 0 10px;">Website</a>
                                            <span style="color: #cbd5e1;">|</span>
                                            <a href="#" style="color: #6b7280; text-decoration: none; font-size: 13px; margin: 0 10px;">Privacy Policy</a>
                                            <span style="color: #cbd5e1;">|</span>
                                            <a href="#" style="color: #6b7280; text-decoration: none; font-size: 13px; margin: 0 10px;">Contact Us</a>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
            </html>
        `,
    };

    await transporter.sendMail(mailOptions);
}

/**
 * Send password reset email with OTP
 * @param {string} to - Recipient email address
 * @param {string} otp - One-time password for password reset
 */
async function sendPasswordResetEmail(to, otp) {
    const mailOptions = {
        from: `"Cambodia Scholarship Portal" <${config.GMAIL_USER}>`,
        to,
        subject: 'Reset Your Password - Cambodia Scholarship Portal',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f4f4; padding: 40px 20px;">
                    <tr>
                        <td align="center">
                            <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                                <!-- Header -->
                                <tr>
                                    <td style="background: linear-gradient(135deg, #374151 0%, #6b7280 100%); padding: 25px 30px; border-radius: 12px 12px 0 0;">
                                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td style="vertical-align: middle; width: 160px;">
                                                    <img src="https://i.imgur.com/1ROxY2G.png" alt="Logo" width="140" height="70" style="display: block; border-radius: 6px; object-fit: contain;">
                                                </td>
                                                <td style="vertical-align: middle; padding-left: 18px;">
                                                    <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700;">Cambodia Scholarship Portal</h1>
                                                    <p style="color: #ffffff; margin: 5px 0 0; font-size: 13px;">Your Gateway to Educational Opportunities</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                
                                <!-- Content -->
                                <tr>
                                    <td style="padding: 40px;">
                                        <h2 style="color: #374151; margin: 0 0 20px; font-size: 22px;">Reset Your Password</h2>
                                        <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 25px;">
                                            We received a request to reset your password for your Cambodia Scholarship Portal account. If you didn't make this request, please ignore this email.
                                        </p>
                                        
                                        <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 25px;">
                                            To reset your password, please use the verification code below:
                                        </p>
                                        
                                        <!-- OTP Box -->
                                        <div style="background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%); border: 2px solid #6b7280; border-radius: 12px; padding: 30px; text-align: center; margin: 30px 0;">
                                            <p style="color: #64748b; font-size: 14px; margin: 0 0 15px; text-transform: uppercase; letter-spacing: 1px;">Your Reset Code</p>
                                            <div style="font-size: 40px; font-weight: 700; letter-spacing: 12px; color: #374151; font-family: 'Courier New', monospace;">${otp}</div>
                                        </div>
                                        
                                        <p style="color: #ef4444; font-size: 14px; margin: 25px 0 0; text-align: center;">
                                            ⏱️ This code will expire in <strong>10 minutes</strong>
                                        </p>
                                        
                                        <!-- Security Notice -->
                                        <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px 20px; margin: 30px 0; border-radius: 0 8px 8px 0;">
                                            <p style="color: #92400e; font-size: 14px; margin: 0;">
                                                <strong>🔒 Security Notice:</strong> Never share this code with anyone. If you didn't request a password reset, please contact our support team immediately.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                                
                                <!-- Footer -->
                                <tr>
                                    <td style="background-color: #f8fafc; padding: 30px 40px; border-radius: 0 0 12px 12px; border-top: 1px solid #e2e8f0;">
                                        <p style="color: #64748b; font-size: 13px; margin: 0 0 10px; text-align: center;">
                                            If you didn't request this password reset, please ignore this email and your password will remain unchanged.
                                        </p>
                                        <p style="color: #94a3b8; font-size: 12px; margin: 0; text-align: center;">
                                            © 2024 Cambodia Scholarship Portal. All rights reserved.
                                        </p>
                                        <div style="text-align: center; margin-top: 20px;">
                                            <a href="#" style="color: #6b7280; text-decoration: none; font-size: 13px; margin: 0 10px;">Website</a>
                                            <span style="color: #cbd5e1;">|</span>
                                            <a href="#" style="color: #6b7280; text-decoration: none; font-size: 13px; margin: 0 10px;">Privacy Policy</a>
                                            <span style="color: #cbd5e1;">|</span>
                                            <a href="#" style="color: #6b7280; text-decoration: none; font-size: 13px; margin: 0 10px;">Contact Us</a>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
            </html>
        `,
    };

    await transporter.sendMail(mailOptions);
}

export { sendOTPEmail, sendPasswordResetEmail };

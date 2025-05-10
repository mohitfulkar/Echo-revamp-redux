// services/emailService.js

import nodemailer from "nodemailer";
import { config } from "../config/config.js";

/**
 * Configure nodemailer transporter
 */
const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  secure: config.email.secure,
  auth: {
    user: config.email.user,
    pass: config.email.password,
  },
});

/**
 * Send OTP verification email
 * @param {string} email - Recipient email
 * @param {string} name - Recipient name
 * @param {string} otp - One-time password
 * @returns {Promise<Object>} - Email sending result
 */
export const sendOTPEmail = async (email, name, otp) => {
  try {
    const mailOptions = {
      from: `"${config.appName}" <${config.email.from}>`,
      to: email,
      subject: "Email Verification OTP",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e4e4e4; border-radius: 5px;">
          <h2 style="color: #333; text-align: center;">Email Verification</h2>
          <p>Hello ${name},</p>
          <p>Thank you for registering! Please use the following One-Time Password (OTP) to verify your email address:</p>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; text-align: center; margin: 20px 0;">
            <h1 style="color: #4a90e2; letter-spacing: 5px; margin: 0;">${otp}</h1>
          </div>
          <p>This OTP will expire in 15 minutes for security reasons.</p>
          <p>If you didn't request this verification, please ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #e4e4e4; margin: 20px 0;">
          <p style="font-size: 12px; color: #777; text-align: center;">
            This is an automated message. Please do not reply to this email.
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send verification email");
  }
};

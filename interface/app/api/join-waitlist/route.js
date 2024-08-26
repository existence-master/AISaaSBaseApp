import { NextResponse } from "next/server"; // Import Next.js server response handling
import nodemailer from "nodemailer"; // Library to send emails

export const POST = async (req) => {
  const { email } = await req.json(); // Extract details from the request body

  // Configure Nodemailer with email SMTP transporter
  const transporter = nodemailer.createTransport({
    service: "gmail", // Gmail as the email service
    auth: {
      user: process.env.EMAIL_USER, // Gmail user from environment variables
      pass: process.env.EMAIL_PASS, // Gmail password from environment variables
    },
    tls: {
      rejectUnauthorized: false, // Accept self-signed certificates
    },
  });

  try {
    // Send the email to the user's email
    await transporter.sendMail({
      from: `"Your Company Name" <${process.env.EMAIL_USER}>`, // Email sender
      to: email, // Recipient email
      subject: "Welcome to the Waiting List!", // Email subject
      text: "Thank you for signing up to the Waiting List. Your feedback will be invaluable for us to improve our platform and fine-tune it to our user's needs. Click the following link to join our WhatsApp Community: ", // Email content
    });

    return new NextResponse({ status: 200 }); // Return the hash as the response with HTTP status 200
  } catch (error) {
    //console.error("Error sending email:", error); // Log the error for debugging
    return new NextResponse(
      JSON.stringify({ error: "Failed to send email" }), // Return error message
      { status: 400 } // HTTP status 400 Bad Request
    );
  }
};

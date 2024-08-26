import User from "../../../models/User"; // Import the User model
import connect from "../../../utils/db"; // Database connection utility
import { authOptions } from "../auth/[...nextauth]/route"; // NextAuth configuration
import { getServerSession } from "next-auth/next"; // Function to get the current session
import { NextResponse } from "next/server"; // Next.js server response handling

export const GET = async () => {
  const session = await getServerSession(authOptions); // Get the current session
  await connect(); // Connect to the database

  try {
    const userEmail = session.user.email; // Get the user's email from the session

    if (!userEmail) {
      throw new Error("User email not found in session"); // Error if user email is not found
    }

    // Find the user with the provided email
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      throw new Error(`User with email ${userEmail} not found`); // Error if user is not found
    }

    // Extract relevant user details
    const email = user.email; // User's username

    // Return the user details as a JSON response
    return new NextResponse(
      JSON.stringify({ email }), // Return user details in JSON format
      { status: 200 } // HTTP status 200 OK
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }), // Return error message
      { status: 500 } // HTTP status 500 Internal Server Error
    );
  }
};

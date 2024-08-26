import User from "../../../models/User"; // Import the User model
import Chat from "../../../models/Chat"; // Import the Chat model
import connect from "../../../utils/db"; // Database connection utility
import { authOptions } from "../auth/[...nextauth]/route"; // NextAuth configuration
import { getServerSession } from "next-auth/next"; // Function to get the current session
import { NextResponse } from "next/server"; // Next.js server response handling

export const POST = async (request) => {
  // Get the current user session
  const session = await getServerSession(authOptions);
  // Connect to the database
  await connect();

  // If there's no session or email, return unauthorized
  if (!session || !session.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 }); // 401 Unauthorized
  }

  try {
    // Get the email from the session
    const { email: userEmail } = session.user;
    // Get the data from the POST request body
    var { title } = await request.json();

    // Ensure the user exists
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return new NextResponse(`User with email ${userEmail} not found`, {
        status: 404,
      }); // 404 Not Found
    }

    // If no title is provided, set it to "New Chat"
    if (title == "") {
      title = "New Chat";
    }

    // Create a new chat with the provided data
    const newChat = await Chat.create({
      title, // Chat title
      user: user._id, // User ID
    });

    // Add the new chat to the user's list of chats
    user.chats.push(newChat._id); // Push the new chat ID to the user's chats array
    await user.save(); // Save the updated user document

    // Return the new chat ID as a response
    return new NextResponse(
      JSON.stringify({ chatId: newChat._id }), // Return the new chat ID in JSON format
      { status: 200 } // 200 OK status
    );
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 }); // 500 Internal Server Error
  }
};

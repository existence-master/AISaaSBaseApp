import Chat from "../../../models/Chat"; // Import the Chat model
import PairedMessage from "../../../models/PairedMessage"; // Import the PairedMessage model
import connect from "../../../utils/db"; // Utility to connect to the database
import { NextResponse } from "next/server"; // Import Next.js server response handling

export const POST = async (request) => {
  try {
    // Extract chatId, requestData, responseData, and mode from the request body
    const { chatId, requestData, responseData } = await request.json();

    await connect(); // Connect to the database
    // Find the chat by its ID
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return new NextResponse("Chat not found", { status: 404 }); // Return 404 if the chat doesn't exist
    }

    // Create a new PairedMessage with the provided input, response, and mode
    const pairedMessage = new PairedMessage({
      input: requestData, // Store the request data
      response: responseData, // Store the response data
    });

    // Save the new PairedMessage to the database
    const savedPairedMessage = await pairedMessage.save();

    // Add the new PairedMessage to the chat's history
    chat.chatHistory.push(savedPairedMessage._id);

    // Save the updated chat to the database
    await chat.save();
    return new NextResponse("Chat updated", { status: 200 }); // Return a success message with HTTP status 200
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 }); // HTTP status 500 Internal Server Error
  }
};

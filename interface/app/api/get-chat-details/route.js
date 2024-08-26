import mongoose from "mongoose"; // Library for working with MongoDB in Node.js
import Chat from "../../../models/Chat"; // Import the Chat model
import PairedMessage from "../../../models/PairedMessage"; // Import the PairedMessage model
import connect from "../../../utils/db"; // Utility to connect to the database
import { NextResponse } from "next/server"; // Import Next.js server response handling

export const POST = async (request) => {
  try {
    // Connect to the database
    await connect();

    // Extract the chatId from the request body
    const { chatId } = await request.json();

    // Check if the provided chatId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(chatId)) {
      throw new Error("Chat not found"); // Throw an error if the ID is invalid
    }

    // Find the chat by its ID
    const chat = await Chat.findById(chatId);

    if (!chat) {
      throw new Error("Chat not found"); // Throw an error if the chat doesn't exist
    }

    // Retrieve the title and filters from the chat
    const chatTitle = chat.title; // Get the chat title

    // Array to store the chat history with input-output pairs
    const chatHistory = [];

    // Populate the array with input-output pairs from the chat history
    for (const pairedChatID of chat.chatHistory) {
      // Find the PairedMessage by its ID
      const message = await PairedMessage.findById(pairedChatID);

      if (!message) {
        throw new Error(`PairedMessage with ID ${pairedChatID} not found`); // Error if message not found
      }

      // Add the input and response to the chat history
      chatHistory.push({
        input: message.input, // Input message
        response: message.response, // Response message
      });
    }

    // Return the chat title, filters, and history
    return new NextResponse(
      JSON.stringify({ chatTitle, chatHistory }), // Return the data as JSON
      { status: 200 } // HTTP status 200 OK
    );
  } catch (error) {
    // Handle specific error cases
    if (error.message === "Chat not found") {
      return new NextResponse(
        JSON.stringify({ message: error.message, error: error }),
        { status: 404 } // HTTP status 404 Not Found
      );
    }

    // Return a general error response for other exceptions
    return new NextResponse(
      JSON.stringify({ message: "Internal server error", error: error }),
      { status: 500 } // HTTP status 500 Internal Server Error
    );
  }
};

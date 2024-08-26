import User from "../../../models/User";
import Chat from "../../../models/Chat";
import connect from "../../../utils/db";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { searchQuery } = await request.json(); // Extract the search query
  const session = await getServerSession(authOptions);
  await connect();

  try {
    const userEmail = session.user?.email;

    if (!userEmail) {
      throw new Error("User email not found in session");
    }

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      throw new Error(`User with email ${userEmail} not found`);
    }

    // Build a query to find chats belonging to the user with optional filters
    const query = {
      _id: { $in: user.chats },
    };

    // Conditionally add search query filter to the query if specified
    // Conditionally add search query filter to the query if specified
    if (searchQuery) {
      query.title = { $regex: searchQuery, $options: "i" }; // Case-insensitive search
    }

    const userChats = await Chat.find(query).select("_id title");

    return new NextResponse(JSON.stringify(userChats), { status: 200 });
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
};

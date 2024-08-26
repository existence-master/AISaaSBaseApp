import User from "../../../models/User";
import connect from "../../../utils/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    await connect();
    const { email, password } = await request.json();

    if (!email || !password) {
      return new NextResponse("Email and password are required", { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new NextResponse("Email is already in use", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      email,
      password : hashedPassword,
    });

    await newUser.save();
    return new NextResponse("User registered successfully", { status: 201 });
  } catch (error) {
    console.error("Error registering user:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};

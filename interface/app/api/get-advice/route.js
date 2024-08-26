import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { input_text } = await req.json();
  try {
    const response = await fetch("http://localhost:5000/advice/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input_text,
      }),
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error querying advice model:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};

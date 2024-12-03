import { supabase } from "@/lib/supabaseClient";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    console.log("Request Body:", { username, password });

    // Query the database
    const { data: users, error } = await supabase
      .from("pokeclients")
      .select("*")
      .eq("username", username)
      .limit(1);

    console.log("Supabase Query Result:", { users, error });

    if (error || !users || users.length === 0) {
      return NextResponse.json(
        { message: "Invalid username or password" },
        { status: 401 }
      );
    }

    // Check password
    const user = users[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log("Password Match:", passwordMatch);

    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Invalid username or password" },
        { status: 401 }
      );
    }

    return NextResponse.json({ message: "Login successful" });
  } catch (error: unknown) {
    console.error("Error in Login:", error);
    return NextResponse.json(
      {
        message: "Error logging in",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

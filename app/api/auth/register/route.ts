import { supabase } from "@/lib/supabaseClient";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json(); // Parse JSON body
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { message: "Username and password are required" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase.from("pokeclients").insert([
      { username, password: hashedPassword },
    ]);

    if (error) {
      throw new Error(error.message); // Explicitly throw an Error
    }

    return NextResponse.json(
      { message: "User registered successfully", user: data },
      { status: 201 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        message: "Error registering user",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET() {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: "Say 'Hello, OpenAI is working!'" }],
      model: "gpt-3.5-turbo",
    });

    return NextResponse.json({
      success: true,
      message: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

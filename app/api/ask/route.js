import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config({ path: './.env.local' });


console.log(process.env.GEMINI_API_KEY);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  const { prompt } = await req.json();

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const geminiResponse = await result.response;
    const text = await geminiResponse.text();

    return Response.json({ text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}

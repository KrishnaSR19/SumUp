import { db } from "@/db"; // adjust path based on your setup
import { Chats, Messages } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function createNewChat(userId) {
  const createdAt = new Date().toISOString();
  const [chat] = await db.insert(Chats).values({ userId, createdAt }).returning();
  return chat;
}

export async function saveMessage(chatId, sender, message) {
  const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  await db.insert(Messages).values({ chatId, sender, message, time });
}

export async function getUserChats(userId) {
  return db.select().from(Chats).where(eq(Chats.userId, userId));
}

export async function getChatMessages(chatId) {
  return db.select().from(Messages).where(eq(Messages.chatId, chatId));
}

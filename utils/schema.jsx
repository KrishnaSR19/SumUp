import { pgTable, serial, integer, varchar, text, numeric } from "drizzle-orm/pg-core";

// Budget Schema
export const Budgets = pgTable('budgets', {
  id: serial("id").primaryKey(),
  name: varchar('name').notNull(),
  amount: numeric('amount').notNull().default('0'),
  icon: varchar('icon'),
  createdBy: varchar('createdBy').notNull()
});

// Expenses Schema
export const Expenses = pgTable('expenses', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  amount: numeric('amount').notNull().default('0'),
  budgetId: integer('budgetId').references(() => Budgets.id),
  createdAt: varchar('createdAt').notNull()
});

// Chat Schema
// Chats table — for storing chat sessions
export const Chats = pgTable('chats', {
  id: serial('id').primaryKey(),
  userId: varchar('userId').notNull(),
  createdAt: varchar('createdAt').notNull(),
  title: varchar('title'), // Optional: auto-generate from first message
});

// Messages table — for individual messages in a chat
export const Messages = pgTable('messages', {
  id: serial('id').primaryKey(),
  chatId: integer('chatId').references(() => Chats.id).notNull(),
  sender: varchar('sender').notNull(), // 'user' or 'assistant'
  message: text('message').notNull(),
  time: varchar('time').notNull(),
});


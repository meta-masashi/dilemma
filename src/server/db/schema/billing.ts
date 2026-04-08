import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";

export const credits = pgTable("credits", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  balance: integer("balance").default(0).notNull(),
  totalPurchased: integer("total_purchased").default(0).notNull(),
  totalConsumed: integer("total_consumed").default(0).notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const creditTransactions = pgTable("credit_transactions", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  amount: integer("amount").notNull(),
  type: text("type", {
    enum: ["purchase", "consume", "free_grant", "refund"],
  }).notNull(),
  description: text("description"),
  stripePaymentId: text("stripe_payment_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const usageTracking = pgTable("usage_tracking", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  month: text("month").notNull(),
  scenariosUsed: integer("scenarios_used").default(0).notNull(),
  apiCalls: integer("api_calls").default(0).notNull(),
  llmTokensUsed: integer("llm_tokens_used").default(0).notNull(),
});

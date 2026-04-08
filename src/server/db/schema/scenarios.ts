import { pgTable, text, timestamp, boolean, jsonb, integer } from "drizzle-orm/pg-core";

export const scenarios = pgTable("scenarios", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  difficulty: integer("difficulty").notNull().default(1),
  clientProfileJson: jsonb("client_profile_json").notNull(),
  initialConditionJson: jsonb("initial_condition_json").notNull(),
  createdBy: text("created_by"),
  isTemplate: boolean("is_template").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const scenarioSessions = pgTable("scenario_sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  scenarioId: text("scenario_id").notNull().references(() => scenarios.id),
  roleChoice: text("role_choice", { enum: ["at", "sc"] }).notNull(),
  status: text("status", {
    enum: ["active", "completed", "failed", "abandoned"],
  }).notNull().default("active"),
  startedAt: timestamp("started_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
});

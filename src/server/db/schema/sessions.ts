import { pgTable, text, timestamp, integer, jsonb } from "drizzle-orm/pg-core";
import { scenarioSessions } from "./scenarios";

export const sessionTurns = pgTable("session_turns", {
  id: text("id").primaryKey(),
  sessionId: text("session_id").notNull().references(() => scenarioSessions.id),
  turnNumber: integer("turn_number").notNull(),
  userActionJson: jsonb("user_action_json"),
  aiResponsesJson: jsonb("ai_responses_json"),
  v7InputJson: jsonb("v7_input_json"),
  v7OutputJson: jsonb("v7_output_json"),
  radarDataJson: jsonb("radar_data_json"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const prescribedMenus = pgTable("prescribed_menus", {
  id: text("id").primaryKey(),
  sessionId: text("session_id").notNull().references(() => scenarioSessions.id),
  turnNumber: integer("turn_number").notNull(),
  exercisesJson: jsonb("exercises_json").notNull(),
  rationaleText: text("rationale_text"),
});

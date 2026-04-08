import { pgTable, text, timestamp, jsonb } from "drizzle-orm/pg-core";
import { scenarioSessions } from "./scenarios";

export const aarRecords = pgTable("aar_records", {
  id: text("id").primaryKey(),
  sessionId: text("session_id").notNull().references(() => scenarioSessions.id),
  causeBreakdownJson: jsonb("cause_breakdown_json").notNull(),
  mentorFeedbackText: text("mentor_feedback_text").notNull(),
  mentorFeedbackSummary: text("mentor_feedback_summary").notNull(),
  evidenceReferences: jsonb("evidence_references"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

import { pgTable, text, timestamp, integer, real, jsonb } from "drizzle-orm/pg-core";

export const userProgress = pgTable("user_progress", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().unique(),
  totalSessions: integer("total_sessions").default(0).notNull(),
  successfulOutcomes: integer("successful_outcomes").default(0).notNull(),
  failedOutcomes: integer("failed_outcomes").default(0).notNull(),
  avgRiskScore: real("avg_risk_score").default(0),
  skillRadarJson: jsonb("skill_radar_json"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

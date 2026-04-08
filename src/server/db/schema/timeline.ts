import { pgTable, text, timestamp, integer, jsonb } from "drizzle-orm/pg-core";
import { scenarioSessions } from "./scenarios";

export const timelineSnapshots = pgTable("timeline_snapshots", {
  id: text("id").primaryKey(),
  sessionId: text("session_id").notNull().references(() => scenarioSessions.id),
  turnNumber: integer("turn_number").notNull(),
  snapshotJson: jsonb("snapshot_json").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const whatifComparisons = pgTable("whatif_comparisons", {
  id: text("id").primaryKey(),
  sessionId: text("session_id").notNull().references(() => scenarioSessions.id),
  originalTurn: integer("original_turn").notNull(),
  modifiedMenuJson: jsonb("modified_menu_json").notNull(),
  modifiedV7OutputJson: jsonb("modified_v7_output_json").notNull(),
  comparisonDataJson: jsonb("comparison_data_json").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

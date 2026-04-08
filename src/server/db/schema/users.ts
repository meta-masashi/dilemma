import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";

export const userProfiles = pgTable("user_profiles", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().unique(),
  displayName: text("display_name"),
  affiliation: text("affiliation"),
  experienceYears: integer("experience_years"),
  specialty: text("specialty"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

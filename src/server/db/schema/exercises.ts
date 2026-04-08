import { pgTable, text, integer, jsonb, vector, index } from "drizzle-orm/pg-core";

export const exercises = pgTable(
  "exercises",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    nameJa: text("name_ja").notNull(),
    category: text("category", {
      enum: ["strength", "stretch", "mobility", "stability", "corrective"],
    }).notNull(),
    targetMuscles: jsonb("target_muscles").notNull(),
    intensityLevel: integer("intensity_level").notNull(),
    contraindications: jsonb("contraindications").notNull(),
    equipment: text("equipment", {
      enum: ["barbell", "dumbbell", "machine", "bodyweight", "band", "other"],
    }).notNull(),
    modificationOptions: jsonb("modification_options"),
    evidenceLevel: text("evidence_level"),
    sourceReference: text("source_reference"),
    embedding: vector("embedding", { dimensions: 768 }),
  },
  (table) => [
    index("exercises_category_idx").on(table.category),
    index("exercises_equipment_idx").on(table.equipment),
  ]
);

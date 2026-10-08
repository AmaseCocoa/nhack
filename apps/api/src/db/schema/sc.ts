import { relations } from "drizzle-orm";
import { date, pgTable, text } from "drizzle-orm/pg-core";

export const schooling = pgTable("schooling", {
    id: text("id").primaryKey(),

    start: date("start").notNull(),
    end: date("end").notNull(),

    location: text("location").notNull(),

    note: text("note").notNull().default("")
})

export const schoolingTimetable = pgTable("schooling_timetable", {
    id: text("id").primaryKey(),
    schoolingId: text("schooling_id").notNull(),

    startTime: date("start_time").notNull(),
    endTime: date("end_time").notNull(),

    subject: text("subject").notNull(),
    location: text("location"),

    note: text("note").notNull().default("")
})

export const schoolingRel = relations(schooling, ({ many }) => ({
    timetables: many(schoolingTimetable)
}))

export const timetablesToSchooling = relations(schoolingTimetable, ({ one }) => ({
    schooling: one(schooling, {
        fields: [schoolingTimetable.schoolingId],
        references: [schooling.id],
    })
}))

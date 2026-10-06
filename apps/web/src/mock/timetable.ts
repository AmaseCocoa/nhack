import type { TimetableEntry } from "#/mock/dashboard";

export type FullTimetableEntry = TimetableEntry & {
	place: string;
};

export const fullTimetable: FullTimetableEntry[] = [
	{
		date: "10/11(土)",
		title: "数学 スクーリング",
		time: "13:00–15:00",
		kind: "スクーリング",
		place: "東京・代々木",
	},
	{
		date: "10/18(土)",
		title: "英語 確認テスト",
		time: "10:00–11:00",
		kind: "テスト",
		place: "オンライン",
	},
	{
		date: "10/25(土)",
		title: "物理 スクーリング",
		time: "13:00–15:00",
		kind: "スクーリング",
		place: "東京・代々木",
	},
	{
		date: "11/08(土)",
		title: "化学 スクーリング",
		time: "13:00–15:00",
		kind: "スクーリング",
		place: "大阪・梅田",
	},
	{
		date: "11/15(土)",
		title: "中間テスト",
		time: "10:00–12:00",
		kind: "テスト",
		place: "オンライン",
	},
	{
		date: "11/29(土)",
		title: "国語 スクーリング",
		time: "13:00–15:00",
		kind: "スクーリング",
		place: "東京・代々木",
	},
	{
		date: "12/13(土)",
		title: "期末テスト",
		time: "10:00–12:00",
		kind: "テスト",
		place: "オンライン",
	},
];

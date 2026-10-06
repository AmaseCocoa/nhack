export type Unit = {
	id: string;
	course: string;
	title: string;
	totalMinutes: number;
	watchedMinutes: number;
};

export const units: Unit[] = [
	{
		id: "math-3",
		course: "数学IA",
		title: "第3章 二次関数",
		totalMinutes: 90,
		watchedMinutes: 64,
	},
	{
		id: "eng-5",
		course: "英語",
		title: "文法 Unit 5 関係詞",
		totalMinutes: 45,
		watchedMinutes: 45,
	},
	{
		id: "phys-2",
		course: "物理",
		title: "力学 演習編",
		totalMinutes: 120,
		watchedMinutes: 30,
	},
	{
		id: "info-1",
		course: "情報",
		title: "Python 基礎",
		totalMinutes: 60,
		watchedMinutes: 60,
	},
	{
		id: "jpn-4",
		course: "国語",
		title: "現代文読解",
		totalMinutes: 75,
		watchedMinutes: 20,
	},
	{
		id: "chem-2",
		course: "化学",
		title: "酸と塩基",
		totalMinutes: 80,
		watchedMinutes: 0,
	},
];

export type TimetableEntry = {
	date: string;
	title: string;
	time: string;
	kind: "スクーリング" | "テスト";
};

export const timetable: TimetableEntry[] = [
	{
		date: "10/11(土)",
		title: "数学 スクーリング",
		time: "13:00–15:00",
		kind: "スクーリング",
	},
	{
		date: "10/18(土)",
		title: "英語 確認テスト",
		time: "10:00–11:00",
		kind: "テスト",
	},
	{
		date: "10/25(土)",
		title: "物理 スクーリング",
		time: "13:00–15:00",
		kind: "スクーリング",
	},
];

export function formatMinutes(min: number) {
	const h = Math.floor(min / 60);
	const m = min % 60;
	if (h === 0) return `${m}分`;
	return `${h}時間${m}分`;
}

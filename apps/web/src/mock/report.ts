export const fiscalMonths = [
	"4月",
	"5月",
	"6月",
	"7月",
	"8月",
	"9月",
	"10月",
	"11月",
	"12月",
	"1月",
	"2月",
	"3月",
];

export type MonthReport = {
	month: string;
	watchMinutes: number;
	targetMinutes: number;
	activeDays: number;
	completed: string[];
};

/** 今年度（2025年度）の月別レポート・モック */
export const currentYearReport: MonthReport[] = [
	{
		month: "4月",
		watchMinutes: 320,
		targetMinutes: 300,
		activeDays: 12,
		completed: ["数学IA 第1章", "英語 Unit 1"],
	},
	{
		month: "5月",
		watchMinutes: 410,
		targetMinutes: 300,
		activeDays: 15,
		completed: ["数学IA 第2章", "情報 ガイダンス"],
	},
	{
		month: "6月",
		watchMinutes: 280,
		targetMinutes: 300,
		activeDays: 10,
		completed: ["英語 Unit 2"],
	},
	{
		month: "7月",
		watchMinutes: 350,
		targetMinutes: 300,
		activeDays: 13,
		completed: ["物理 導入編", "英語 Unit 3"],
	},
	{
		month: "8月",
		watchMinutes: 180,
		targetMinutes: 240,
		activeDays: 7,
		completed: ["国語 ガイダンス"],
	},
	{
		month: "9月",
		watchMinutes: 390,
		targetMinutes: 300,
		activeDays: 14,
		completed: ["数学IA 演習", "情報 Python 基礎"],
	},
	{
		month: "10月",
		watchMinutes: 150,
		targetMinutes: 300,
		activeDays: 6,
		completed: [],
	},
	{
		month: "11月",
		watchMinutes: 0,
		targetMinutes: 300,
		activeDays: 0,
		completed: [],
	},
	{
		month: "12月",
		watchMinutes: 0,
		targetMinutes: 240,
		activeDays: 0,
		completed: [],
	},
	{
		month: "1月",
		watchMinutes: 0,
		targetMinutes: 300,
		activeDays: 0,
		completed: [],
	},
	{
		month: "2月",
		watchMinutes: 0,
		targetMinutes: 300,
		activeDays: 0,
		completed: [],
	},
	{
		month: "3月",
		watchMinutes: 0,
		targetMinutes: 240,
		activeDays: 0,
		completed: [],
	},
];

export const pastYears = ["2024年度", "2023年度"] as const;

/** 過去年度の月別レポート・モック */
export const pastReport: Record<string, MonthReport[]> = {
	"2024年度": [
		{
			month: "4月",
			watchMinutes: 300,
			targetMinutes: 300,
			activeDays: 11,
			completed: ["数学IA 復習"],
		},
		{
			month: "5月",
			watchMinutes: 360,
			targetMinutes: 300,
			activeDays: 14,
			completed: ["英語 Unit 4", "物理 復習"],
		},
		{
			month: "6月",
			watchMinutes: 310,
			targetMinutes: 300,
			activeDays: 12,
			completed: ["化学 導入"],
		},
		{
			month: "7月",
			watchMinutes: 290,
			targetMinutes: 300,
			activeDays: 10,
			completed: [],
		},
		{
			month: "8月",
			watchMinutes: 200,
			targetMinutes: 240,
			activeDays: 8,
			completed: ["国語 復習"],
		},
		{
			month: "9月",
			watchMinutes: 330,
			targetMinutes: 300,
			activeDays: 13,
			completed: ["数学 演習2"],
		},
		{
			month: "10月",
			watchMinutes: 340,
			targetMinutes: 300,
			activeDays: 13,
			completed: ["英語 Unit 5"],
		},
		{
			month: "11月",
			watchMinutes: 300,
			targetMinutes: 300,
			activeDays: 12,
			completed: ["物理 演習"],
		},
		{
			month: "12月",
			watchMinutes: 220,
			targetMinutes: 240,
			activeDays: 9,
			completed: [],
		},
		{
			month: "1月",
			watchMinutes: 310,
			targetMinutes: 300,
			activeDays: 12,
			completed: ["化学 演習"],
		},
		{
			month: "2月",
			watchMinutes: 350,
			targetMinutes: 300,
			activeDays: 14,
			completed: ["総復習 1"],
		},
		{
			month: "3月",
			watchMinutes: 260,
			targetMinutes: 240,
			activeDays: 10,
			completed: ["総復習 2"],
		},
	],
	"2023年度": [
		{
			month: "4月",
			watchMinutes: 240,
			targetMinutes: 300,
			activeDays: 9,
			completed: ["ガイダンス"],
		},
		{
			month: "5月",
			watchMinutes: 280,
			targetMinutes: 300,
			activeDays: 10,
			completed: ["数学 基礎1"],
		},
		{
			month: "6月",
			watchMinutes: 260,
			targetMinutes: 300,
			activeDays: 10,
			completed: [],
		},
		{
			month: "7月",
			watchMinutes: 300,
			targetMinutes: 300,
			activeDays: 11,
			completed: ["英語 基礎1"],
		},
		{
			month: "8月",
			watchMinutes: 160,
			targetMinutes: 240,
			activeDays: 6,
			completed: [],
		},
		{
			month: "9月",
			watchMinutes: 290,
			targetMinutes: 300,
			activeDays: 11,
			completed: ["数学 基礎2"],
		},
		{
			month: "10月",
			watchMinutes: 310,
			targetMinutes: 300,
			activeDays: 12,
			completed: ["物理 基礎"],
		},
		{
			month: "11月",
			watchMinutes: 270,
			targetMinutes: 300,
			activeDays: 10,
			completed: [],
		},
		{
			month: "12月",
			watchMinutes: 180,
			targetMinutes: 240,
			activeDays: 7,
			completed: ["冬期復習"],
		},
		{
			month: "1月",
			watchMinutes: 250,
			targetMinutes: 300,
			activeDays: 9,
			completed: [],
		},
		{
			month: "2月",
			watchMinutes: 290,
			targetMinutes: 300,
			activeDays: 11,
			completed: ["英語 基礎2"],
		},
		{
			month: "3月",
			watchMinutes: 230,
			targetMinutes: 240,
			activeDays: 9,
			completed: ["年度まとめ"],
		},
	],
};

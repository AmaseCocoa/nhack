import { Code, Group, ScrollArea } from "@mantine/core";
import {
	IconAdjustments,
	IconCalendarStats,
	IconFileAnalytics,
	IconGauge,
	IconLock,
	IconNotes,
	IconPresentationAnalytics,
} from "@tabler/icons-react";
import { LinksGroup } from "../NavbarLinksGroup/NavbarLinksGroup";
import { UserButton } from "../UserButton/UserButton";
import { Logo } from "./Logo";
import classes from "./Navbar.module.css";

const mockdata = [
	{ label: "ダッシュボード", icon: IconGauge },
	{
		label: "レポート",
		icon: IconCalendarStats,
		initiallyOpened: true,
		links: [
			{ label: "今年度", link: "/" },
			{ label: "過去のレポート", link: "/" },
		],
	},
	{ label: "スクーリング・テスト", icon: IconPresentationAnalytics },
	{ label: "設定", icon: IconAdjustments },
];

export function NavbarNested() {
	const links = mockdata.map((item) => (
		<LinksGroup {...item} key={item.label} />
	));

	return (
		<nav className={classes.navbar} aria-label="Main navigation">
			<div className={classes.header}>
				<Group justify="space-between">
					<Logo style={{ width: 120 }} />
					<Code fw={700}>v0.1.0</Code>
				</Group>
			</div>

			<ScrollArea className={classes.links}>
				<div className={classes.linksInner}>{links}</div>
			</ScrollArea>

			<div className={classes.footer}>
				<UserButton />
			</div>
		</nav>
	);
}

export const Navbar = NavbarNested;

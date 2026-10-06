import {
	Box,
	Collapse,
	Group,
	Text,
	ThemeIcon,
	UnstyledButton,
} from "@mantine/core";
import type { TablerIcon } from "@tabler/icons-react";
import { IconChevronRight } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import classes from "./NavbarLinksGroup.module.css";

interface LinksGroupProps {
	icon: TablerIcon;
	label: string;
	link?: string;
	initiallyOpened?: boolean;
	links?: { label: string; link: string }[];
}

export function LinksGroup({
	icon: Icon,
	label,
	link,
	initiallyOpened,
	links,
}: LinksGroupProps) {
	const hasLinks = Array.isArray(links) && links.length > 0;
	const [opened, setOpened] = useState(initiallyOpened ?? false);
	const items = (hasLinks ? (links ?? []) : []).map((item) => (
		<Text
			component={Link}
			className={classes.link}
			to={item.link}
			key={item.label}
		>
			{item.label}
		</Text>
	));

	const controlInner = (
		<Group justify="space-between" gap={0}>
			<Box style={{ display: "flex", alignItems: "center" }}>
				<ThemeIcon variant="light" size={30}>
					<Icon size={18} />
				</ThemeIcon>
				<Box ml="md">{label}</Box>
			</Box>
			{hasLinks && (
				<IconChevronRight
					className={classes.chevron}
					stroke={1.5}
					size={16}
					style={{ transform: opened ? "rotate(90deg)" : "none" }}
				/>
			)}
		</Group>
	);

	if (!hasLinks && link) {
		return (
			<UnstyledButton component={Link} to={link} className={classes.control}>
				{controlInner}
			</UnstyledButton>
		);
	}

	return (
		<>
			<UnstyledButton
				onClick={() => setOpened((o) => !o)}
				className={classes.control}
			>
				<Group justify="space-between" gap={0}>
					<Box style={{ display: "flex", alignItems: "center" }}>
						<ThemeIcon variant="light" size={30}>
							<Icon size={18} />
						</ThemeIcon>
						<Box ml="md">{label}</Box>
					</Box>
					{hasLinks && (
						<IconChevronRight
							className={classes.chevron}
							stroke={1.5}
							size={16}
							style={{ transform: opened ? "rotate(90deg)" : "none" }}
						/>
					)}
				</Group>
			</UnstyledButton>
			{hasLinks ? <Collapse expanded={opened}>{items}</Collapse> : null}
		</>
	);
}

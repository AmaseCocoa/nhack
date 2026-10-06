import {
	Badge,
	Card,
	Group,
	List,
	Paper,
	Progress,
	ScrollArea,
	SimpleGrid,
	Tabs,
	Text,
	ThemeIcon,
} from "@mantine/core";
import { IconCalendarCheck, IconClock, IconMedal } from "@tabler/icons-react";
import { useState } from "react";
import { formatMinutes } from "#/mock/dashboard";
import type { MonthReport } from "#/mock/report";

function MonthPanel({ data }: { data: MonthReport }) {
	const pct =
		data.targetMinutes === 0
			? 0
			: Math.min(
					100,
					Math.round((data.watchMinutes / data.targetMinutes) * 100),
				);
	return (
		<div>
			<SimpleGrid cols={{ base: 1, sm: 3 }} mb="md">
				<Paper withBorder p="md" radius="md">
					<Group justify="space-between">
						<Text size="xs" c="dimmed" fw={700}>
							視聴時間 / 目標
						</Text>
						<ThemeIcon variant="light" size="md" radius="md" color="blue">
							<IconClock size={16} />
						</ThemeIcon>
					</Group>
					<Text size="lg" fw={800} mt="xs">
						{formatMinutes(data.watchMinutes)}
						<Text span size="sm" c="dimmed">
							{" "}
							/ {formatMinutes(data.targetMinutes)}
						</Text>
					</Text>
					<Progress value={pct} size="sm" radius="xl" mt="xs" />
				</Paper>
				<Paper withBorder p="md" radius="md">
					<Group justify="space-between">
						<Text size="xs" c="dimmed" fw={700}>
							視聴日数
						</Text>
						<ThemeIcon variant="light" size="md" radius="md" color="teal">
							<IconCalendarCheck size={16} />
						</ThemeIcon>
					</Group>
					<Text size="lg" fw={800} mt="xs">
						{data.activeDays}日
					</Text>
					<Text size="xs" c="dimmed" mt="xs">
						{data.month}の記録
					</Text>
				</Paper>
				<Paper withBorder p="md" radius="md">
					<Group justify="space-between">
						<Text size="xs" c="dimmed" fw={700}>
							完了単元
						</Text>
						<ThemeIcon variant="light" size="md" radius="md" color="violet">
							<IconMedal size={16} />
						</ThemeIcon>
					</Group>
					<Text size="lg" fw={800} mt="xs">
						{data.completed.length}単元
					</Text>
					<Text size="xs" c="dimmed" mt="xs">
						{data.completed.length === 0 ? "完了なし" : "おつかれさま"}
					</Text>
				</Paper>
			</SimpleGrid>

			<Card withBorder radius="md" padding="md">
				<Text fw={700} mb="xs">
					完了した単元
				</Text>
				{data.completed.length === 0 ? (
					<Text size="sm" c="dimmed">
						この月は完了した単元がありません（モック）。
					</Text>
				) : (
					<List spacing="xs" size="sm">
						{data.completed.map((c) => (
							<List.Item key={c}>
								<Group gap="xs">
									<Text size="sm">{c}</Text>
									<Badge size="xs" color="teal" variant="light">
										完了
									</Badge>
								</Group>
							</List.Item>
						))}
					</List>
				)}
			</Card>
		</div>
	);
}

export function ReportMonthTabs({ data }: { data: MonthReport[] }) {
	const fallback = data.find((d) => d.watchMinutes > 0) ?? data[0];
	const [active, setActive] = useState<string | null>(
		(data.filter((d) => d.watchMinutes > 0).pop() ?? fallback).month,
	);
	return (
		<Tabs value={active} onChange={setActive}>
			<ScrollArea type="auto" mb="md">
				<Tabs.List>
					{data.map((d) => (
						<Tabs.Tab key={d.month} value={d.month}>
							{d.month}
						</Tabs.Tab>
					))}
				</Tabs.List>
			</ScrollArea>
			{data.map((d) => (
				<Tabs.Panel key={d.month} value={d.month} pt="xs">
					<MonthPanel data={d} />
				</Tabs.Panel>
			))}
		</Tabs>
	);
}

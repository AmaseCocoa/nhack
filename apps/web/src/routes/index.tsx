import {
	Badge,
	Button,
	Card,
	Grid,
	Group,
	Paper,
	Progress,
	RingProgress,
	SegmentedControl,
	SimpleGrid,
	Table,
	Text,
	ThemeIcon,
	Timeline,
	Title,
} from "@mantine/core";
import {
	IconCalendarEvent,
	IconChartBar,
	IconCheck,
	IconClock,
	IconDownload,
} from "@tabler/icons-react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Breadcrumbs } from "#/components/Breadcrumbs";
import { formatMinutes, timetable, units } from "#/mock/dashboard";
import { currentYearReport } from "#/mock/report";

export const Route = createFileRoute("/")({ component: Dashboard });

const TARGETS = ["30分", "60分", "90分"];

function Dashboard() {
	const [targetLabel, setTargetLabel] = useState("60分");
	const target = Number.parseInt(targetLabel, 10);

	const remaining = units.map((u) => ({
		...u,
		left: u.totalMinutes - u.watchedMinutes,
	}));
	const totalLeft = remaining.reduce((s, u) => s + u.left, 0);
	const totalAll = units.reduce((s, u) => s + u.totalMinutes, 0);
	const totalWatched = totalAll - totalLeft;
	const doneCount = remaining.filter((u) => u.left === 0).length;
	const completion = Math.round((totalWatched / totalAll) * 100);
	const october = currentYearReport.find((r) => r.month === "10月");

	// 「特定の分数視聴するにはどこまでやる必要があるか」のマーク計算
	let acc = 0;
	let markId: string | null = null;
	for (const u of remaining) {
		if (u.left === 0) continue;
		acc += u.left;
		if (markId === null && acc >= target) markId = u.id;
	}

	return (
		<main style={{ padding: "24px 16px 32px" }}>
			<Breadcrumbs detail={{ title: "ダッシュボード", href: "/" }} items={[]} />

			<Group justify="space-between" align="center" mt="md" mb="md">
				<div>
					<Title order={2}>概要</Title>
					<Text size="sm" c="dimmed">
						ZEN Study の視聴進捗・時間割（モック表示）
					</Text>
				</div>
				<Group>
					<SegmentedControl
						value={targetLabel}
						onChange={setTargetLabel}
						data={TARGETS}
					/>
					<Button
						component={Link}
						to="/timetable"
						leftSection={<IconDownload size={16} />}
						variant="default"
					>
						時間割を見る
					</Button>
				</Group>
			</Group>

			<SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} mb="md">
				<Paper withBorder p="md" radius="md">
					<Group justify="space-between">
						<Text size="xs" c="dimmed" fw={700}>
							残り視聴時間
						</Text>
						<ThemeIcon variant="light" size="md" radius="md" color="blue">
							<IconClock size={16} />
						</ThemeIcon>
					</Group>
					<Text size="xl" fw={800} mt="xs">
						{formatMinutes(totalLeft)}
					</Text>
					<Text size="xs" c="dimmed" mt="xs">
						全{units.length}単元・合計{formatMinutes(totalAll)}
					</Text>
				</Paper>

				<Paper withBorder p="md" radius="md">
					<Group justify="space-between">
						<Text size="xs" c="dimmed" fw={700}>
							完了単元
						</Text>
						<ThemeIcon variant="light" size="md" radius="md" color="teal">
							<IconCheck size={16} />
						</ThemeIcon>
					</Group>
					<Text size="xl" fw={800} mt="xs">
						{doneCount}/{units.length}単元
					</Text>
					<Text size="xs" c="dimmed" mt="xs">
						視聴率 {completion}%
					</Text>
				</Paper>

				<Paper withBorder p="md" radius="md">
					<Group justify="space-between">
						<Text size="xs" c="dimmed" fw={700}>
							次のスクーリング
						</Text>
						<ThemeIcon variant="light" size="md" radius="md" color="violet">
							<IconCalendarEvent size={16} />
						</ThemeIcon>
					</Group>
					<Text size="xl" fw={800} mt="xs">
						{timetable[0].date}
					</Text>
					<Text size="xs" c="dimmed" mt="xs">
						{timetable[0].title} {timetable[0].time}
					</Text>
				</Paper>

				<Paper withBorder p="md" radius="md">
					<Group justify="space-between">
						<Text size="xs" c="dimmed" fw={700}>
							今月の視聴時間
						</Text>
						<ThemeIcon variant="light" size="md" radius="md" color="green">
							<IconChartBar size={16} />
						</ThemeIcon>
					</Group>
					<Text size="xl" fw={800} mt="xs">
						{october ? formatMinutes(october.watchMinutes) : "—"}
					</Text>
					<Text size="xs" c="dimmed" mt="xs">
						目標 {october ? formatMinutes(october.targetMinutes) : "—"}（10月）
					</Text>
				</Paper>
			</SimpleGrid>

			<Grid>
				<Grid.Col span={{ base: 12, lg: 8 }}>
					<Card withBorder radius="md" padding="lg">
						<Group justify="space-between" mb="sm">
							<div>
								<Text fw={700}>単元一覧と残り時間</Text>
								<Text size="xs" c="dimmed">
									目標{target}分 →「ここまで」マークで到達点を表示
								</Text>
							</div>
							<Badge variant="light">残り {formatMinutes(totalLeft)}</Badge>
						</Group>
						<Table.ScrollContainer minWidth={620}>
							<Table verticalSpacing="sm" highlightOnHover>
								<Table.Thead>
									<Table.Tr>
										<Table.Th>単元</Table.Th>
										<Table.Th>視聴済み</Table.Th>
										<Table.Th>残り</Table.Th>
										<Table.Th>進捗</Table.Th>
										<Table.Th>マーク</Table.Th>
									</Table.Tr>
								</Table.Thead>
								<Table.Tbody>
									{remaining.map((u) => {
										const pct = Math.round(
											(u.watchedMinutes / u.totalMinutes) * 100,
										);
										const isMark = u.id === markId;
										return (
											<Table.Tr key={u.id}>
												<Table.Td>
													<Text size="sm" fw={600}>
														{u.title}
													</Text>
													<Text size="xs" c="dimmed">
														{u.course}・全{formatMinutes(u.totalMinutes)}
													</Text>
												</Table.Td>
												<Table.Td>{formatMinutes(u.watchedMinutes)}</Table.Td>
												<Table.Td>{formatMinutes(u.left)}</Table.Td>
												<Table.Td style={{ minWidth: 120 }}>
													<Group gap="xs">
														<Progress
															value={pct}
															size="sm"
															radius="xl"
															style={{ flex: 1 }}
														/>
														<Text size="xs" c="dimmed" w={34}>
															{pct}%
														</Text>
													</Group>
												</Table.Td>
												<Table.Td>
													{isMark ? (
														<Badge color="blue" variant="filled">
															ここまでで{target}分
														</Badge>
													) : u.left === 0 ? (
														<Badge color="teal" variant="light">
															完了
														</Badge>
													) : (
														<Text size="xs" c="dimmed">
															—
														</Text>
													)}
												</Table.Td>
											</Table.Tr>
										);
									})}
								</Table.Tbody>
							</Table>
						</Table.ScrollContainer>
					</Card>
				</Grid.Col>

				<Grid.Col span={{ base: 12, lg: 4 }}>
					<Card withBorder radius="md" padding="lg">
						<Text fw={700}>全体の視聴率</Text>
						<Group justify="center" mt="sm">
							<RingProgress
								size={160}
								thickness={16}
								roundCaps
								label={
									<Text size="xl" fw={800} ta="center">
										{completion}%
									</Text>
								}
								sections={[{ value: completion, color: "blue" }]}
							/>
						</Group>
						<Text size="xs" c="dimmed" ta="center" mt="xs">
							{formatMinutes(totalWatched)} / {formatMinutes(totalAll)} 視聴済み
						</Text>
					</Card>

					<Card withBorder radius="md" padding="lg" mt="md">
						<Group justify="space-between" mb="sm">
							<Text fw={700}>時間割</Text>
							<Button
								component={Link}
								to="/timetable"
								variant="subtle"
								size="xs"
							>
								すべて見る
							</Button>
						</Group>
						<Timeline active={0} bulletSize={22} lineWidth={2}>
							{timetable.map((t) => (
								<Timeline.Item
									key={t.date + t.title}
									title={`${t.date} ${t.title}`}
								>
									<Text size="xs" mt={2}>
										{t.time}
									</Text>
									<Badge
										size="xs"
										mt={4}
										color={t.kind === "テスト" ? "red" : "blue"}
										variant="light"
									>
										{t.kind}
									</Badge>
								</Timeline.Item>
							))}
						</Timeline>
					</Card>
				</Grid.Col>
			</Grid>
		</main>
	);
}

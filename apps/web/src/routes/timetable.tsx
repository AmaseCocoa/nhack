import {
	Badge,
	Button,
	Card,
	Group,
	Table,
	Text,
	Timeline,
	Title,
} from "@mantine/core";
import { IconCalendarDown } from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "#/components/Breadcrumbs";
import { fullTimetable } from "#/mock/timetable";

export const Route = createFileRoute("/timetable")({
	component: TimetablePage,
});

function TimetablePage() {
	return (
		<main style={{ padding: "24px 16px 32px" }}>
			<Breadcrumbs
				detail={{ title: "時間割", href: "/timetable" }}
				items={[]}
			/>

			<Group justify="space-between" align="center" mt="md" mb="md">
				<div>
					<Title order={2}>スクーリング・テスト時間割</Title>
					<Text size="sm" c="dimmed">
						URLベースでiCalとして書き出し可能（モック表示）
					</Text>
				</div>
				<Button leftSection={<IconCalendarDown size={16} />} variant="default">
					iCalとして出力
				</Button>
			</Group>

			<Card withBorder radius="md" padding="lg" mb="md">
				<Text fw={700} mb="sm">
					直近の予定
				</Text>
				<Timeline active={0} bulletSize={22} lineWidth={2}>
					{fullTimetable.slice(0, 3).map((t) => (
						<Timeline.Item
							key={t.date + t.title}
							title={`${t.date} ${t.title}`}
						>
							<Text size="xs" mt={2}>
								{t.time}・{t.place}
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

			<Card withBorder radius="md" padding="lg">
				<Text fw={700} mb="sm">
					全日程
				</Text>
				<Table.ScrollContainer minWidth={620}>
					<Table verticalSpacing="sm" highlightOnHover>
						<Table.Thead>
							<Table.Tr>
								<Table.Th>日付</Table.Th>
								<Table.Th>内容</Table.Th>
								<Table.Th>時間</Table.Th>
								<Table.Th>種別</Table.Th>
								<Table.Th>場所</Table.Th>
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>
							{fullTimetable.map((t) => (
								<Table.Tr key={t.date + t.title}>
									<Table.Td>
										<Text size="sm" fw={600}>
											{t.date}
										</Text>
									</Table.Td>
									<Table.Td>{t.title}</Table.Td>
									<Table.Td>{t.time}</Table.Td>
									<Table.Td>
										<Badge
											color={t.kind === "テスト" ? "red" : "blue"}
											variant="light"
										>
											{t.kind}
										</Badge>
									</Table.Td>
									<Table.Td>
										<Text size="sm" c="dimmed">
											{t.place}
										</Text>
									</Table.Td>
								</Table.Tr>
							))}
						</Table.Tbody>
					</Table>
				</Table.ScrollContainer>
			</Card>
		</main>
	);
}

import { Badge, Card, Group, RingProgress, Text, Title } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "#/components/Breadcrumbs";
import { ReportMonthTabs } from "#/components/ReportMonthTabs";
import { formatMinutes } from "#/mock/dashboard";
import { currentYearReport } from "#/mock/report";

export const Route = createFileRoute("/report/current")({
	component: CurrentReport,
});

function CurrentReport() {
	const total = currentYearReport.reduce((s, m) => s + m.watchMinutes, 0);
	const target = currentYearReport.reduce((s, m) => s + m.targetMinutes, 0);
	const pct = Math.min(100, Math.round((total / target) * 100));

	return (
		<main style={{ padding: "24px 16px 32px" }}>
			<Breadcrumbs
				detail={{ title: "今年度", href: "/report/current" }}
				items={[{ title: "レポート", href: "/report/current" }]}
			/>

			<Group justify="space-between" align="center" mt="md" mb="md">
				<div>
					<Title order={2}>今年度レポート</Title>
					<Text size="sm" c="dimmed">
						2025年度・月別タブで視聴記録を確認（モック表示）
					</Text>
				</div>
				<Badge size="lg" variant="light">
					累計 {formatMinutes(total)}
				</Badge>
			</Group>

			<Card withBorder radius="md" padding="lg" mb="md">
				<Group>
					<RingProgress
						size={120}
						thickness={12}
						roundCaps
						label={
							<Text size="lg" fw={800} ta="center">
								{pct}%
							</Text>
						}
						sections={[{ value: pct, color: "blue" }]}
					/>
					<div>
						<Text fw={700}>年間目標に対する進捗</Text>
						<Text size="sm" c="dimmed">
							{formatMinutes(total)} / {formatMinutes(target)}
						</Text>
					</div>
				</Group>
			</Card>

			<ReportMonthTabs data={currentYearReport} />
		</main>
	);
}

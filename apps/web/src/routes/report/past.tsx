import {
	Badge,
	Card,
	Group,
	RingProgress,
	SegmentedControl,
	Text,
	Title,
} from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Breadcrumbs } from "#/components/Breadcrumbs";
import { ReportMonthTabs } from "#/components/ReportMonthTabs";
import { formatMinutes } from "#/mock/dashboard";
import { pastReport, pastYears } from "#/mock/report";

export const Route = createFileRoute("/report/past")({
	component: PastReport,
});

function PastReport() {
	const [year, setYear] = useState<string>(pastYears[0]);
	const data = pastReport[year] ?? [];
	const total = data.reduce((s, m) => s + m.watchMinutes, 0);
	const target = data.reduce((s, m) => s + m.targetMinutes, 0);
	const pct =
		target === 0 ? 0 : Math.min(100, Math.round((total / target) * 100));

	return (
		<main style={{ padding: "24px 16px 32px" }}>
			<Breadcrumbs
				detail={{ title: "過去のレポート", href: "/report/past" }}
				items={[{ title: "レポート", href: "/report/current" }]}
			/>

			<Group justify="space-between" align="center" mt="md" mb="md">
				<div>
					<Title order={2}>過去のレポート</Title>
					<Text size="sm" c="dimmed">
						年度別の視聴記録アーカイブ（モック表示）
					</Text>
				</div>
				<SegmentedControl
					value={year}
					onChange={setYear}
					data={[...pastYears]}
				/>
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
						sections={[{ value: pct, color: "teal" }]}
					/>
					<div>
						<Text fw={700}>{year}の年間サマリー</Text>
						<Text size="sm" c="dimmed">
							{formatMinutes(total)} / {formatMinutes(target)}
						</Text>
						<Badge mt="xs" color="teal" variant="light">
							確定済み
						</Badge>
					</div>
				</Group>
			</Card>

			<ReportMonthTabs key={year} data={data} />
		</main>
	);
}

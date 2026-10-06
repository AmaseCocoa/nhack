import {
	Avatar,
	Badge,
	Button,
	Card,
	Group,
	Stack,
	Switch,
	Text,
	Title,
} from "@mantine/core";
import { IconCopy, IconRefresh } from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Breadcrumbs } from "#/components/Breadcrumbs";
import { linkKey } from "#/mock/settings";

export const Route = createFileRoute("/settings")({
	component: SettingsPage,
});

function SettingsPage() {
	const [showKey, setShowKey] = useState(false);
	const [mailNotice, setMailNotice] = useState(true);
	const [reminder, setReminder] = useState(true);

	return (
		<main style={{ padding: "24px 16px 32px" }}>
			<Breadcrumbs detail={{ title: "設定", href: "/settings" }} items={[]} />

			<Title order={2} mt="md" mb="md">
				設定
			</Title>

			<Card withBorder radius="md" padding="lg" mb="md">
				<Text fw={700}>アカウント</Text>
				<Group mt="sm">
					<Avatar
						src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
						radius="xl"
						size="lg"
						alt="ログインユーザー"
					/>
					<div>
						<Text fw={600}>Harriette Spoonlicker</Text>
						<Text size="sm" c="dimmed">
							hspoonlicker@outlook.com
						</Text>
					</div>
				</Group>
			</Card>

			<Card withBorder radius="md" padding="lg" mb="md">
				<Group justify="space-between">
					<Text fw={700}>Link Key</Text>
					<Badge color="teal" variant="light">
						{linkKey.status}
					</Badge>
				</Group>
				<Text size="sm" c="dimmed" mt="xs">
					拡張機能（{linkKey.extension}
					）との連携用キー。実質的なAPIキーとして扱い、
					他人に共有しないでください。
				</Text>
				<Stack gap="xs" mt="md">
					<Group justify="space-between">
						<Text size="sm" c="dimmed">
							キー
						</Text>
						<Group gap="xs">
							<Text size="sm" fw={600} ff="monospace">
								{showKey ? linkKey.full : linkKey.masked}
							</Text>
							<Button
								variant="subtle"
								size="xs"
								onClick={() => setShowKey((v) => !v)}
							>
								{showKey ? "隠す" : "表示"}
							</Button>
						</Group>
					</Group>
					<Group justify="space-between">
						<Text size="sm" c="dimmed">
							最終同期
						</Text>
						<Text size="sm">{linkKey.lastSync}</Text>
					</Group>
					<Group mt="xs">
						<Button
							variant="default"
							size="xs"
							leftSection={<IconCopy size={14} />}
						>
							コピー
						</Button>
						<Button
							variant="default"
							size="xs"
							leftSection={<IconRefresh size={14} />}
						>
							キーを再発行
						</Button>
					</Group>
				</Stack>
			</Card>

			<Card withBorder radius="md" padding="lg">
				<Text fw={700} mb="sm">
					通知
				</Text>
				<Stack gap="sm">
					<Group justify="space-between">
						<div>
							<Text size="sm">メール通知</Text>
							<Text size="xs" c="dimmed">
								レポート確定・テスト結果をメールで受け取る
							</Text>
						</div>
						<Switch
							checked={mailNotice}
							onChange={(e) => setMailNotice(e.currentTarget.checked)}
							aria-label="メール通知"
						/>
					</Group>
					<Group justify="space-between">
						<div>
							<Text size="sm">スクーリング前のリマインド</Text>
							<Text size="xs" c="dimmed">
								3日前に通知する
							</Text>
						</div>
						<Switch
							checked={reminder}
							onChange={(e) => setReminder(e.currentTarget.checked)}
							aria-label="スクーリング前のリマインド"
						/>
					</Group>
				</Stack>
			</Card>
		</main>
	);
}

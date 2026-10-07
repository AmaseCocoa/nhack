import {
	Alert,
	Avatar,
	Badge,
	Button,
	Card,
	Group,
	Modal,
	Select,
	Stack,
	Switch,
	Text,
	Title,
} from "@mantine/core";
import { IconArchive, IconCopy, IconRefresh } from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Breadcrumbs } from "#/components/Breadcrumbs";
import {
	type ArchiveInfo,
	type ArchiveReason,
	archiveReasons,
	type LinkKeyStatus,
	linkKey,
} from "#/mock/settings";

export const Route = createFileRoute("/settings")({
	component: SettingsPage,
});

function today() {
	return new Date().toLocaleDateString("ja-JP", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	});
}

function SettingsPage() {
	const [showKey, setShowKey] = useState(false);
	const [mailNotice, setMailNotice] = useState(true);
	const [reminder, setReminder] = useState(true);
	const [keyStatus, setKeyStatus] = useState<LinkKeyStatus>(linkKey.status);
	const [archiveInfo, setArchiveInfo] = useState<ArchiveInfo | null>(null);
	const [archiveOpened, setArchiveOpened] = useState(false);
	const [reactivateOpened, setReactivateOpened] = useState(false);
	const [reason, setReason] = useState<ArchiveReason | null>(null);

	const archived = keyStatus === "archived";

	function confirmArchive() {
		if (reason === null) return;
		setKeyStatus("archived");
		setArchiveInfo({ reason, date: today() });
		setArchiveOpened(false);
		setReason(null);
		setShowKey(false);
	}

	function confirmReactivate() {
		setKeyStatus("active");
		setArchiveInfo(null);
		setReactivateOpened(false);
	}

	return (
		<main style={{ padding: "24px 16px 32px" }}>
			<Breadcrumbs detail={{ title: "設定", href: "/settings" }} items={[]} />

			<Title order={2} mt="md" mb="md">
				設定
			</Title>

			{archived && (
				<Alert color="yellow" title="Link Keyは停止中です" mb="md">
					拡張機能との同期は停止しています
					{archiveInfo
						? `（${archiveInfo.reason}・${archiveInfo.date}に停止）`
						: ""}
					。視聴記録の反映を再開するには、下の「連携を再開する」から再開してください。
				</Alert>
			)}

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
					<Badge color={archived ? "gray" : "teal"} variant="light">
						{archived ? "停止中" : linkKey.status}
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
								{archived
									? "••••••••"
									: showKey
										? linkKey.full
										: linkKey.masked}
							</Text>
							<Button
								variant="subtle"
								size="xs"
								disabled={archived}
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
						<Text size="sm">{archived ? "—" : linkKey.lastSync}</Text>
					</Group>
					{archived && archiveInfo && (
						<Group justify="space-between">
							<Text size="sm" c="dimmed">
								停止理由・停止日
							</Text>
							<Text size="sm">
								{archiveInfo.reason}・{archiveInfo.date}
							</Text>
						</Group>
					)}
					<Group mt="xs">
						<Button
							variant="default"
							size="xs"
							disabled={archived}
							leftSection={<IconCopy size={14} />}
						>
							コピー
						</Button>
						<Button
							variant="default"
							size="xs"
							disabled={archived}
							leftSection={<IconRefresh size={14} />}
						>
							キーを再発行
						</Button>
					</Group>
				</Stack>
			</Card>

			<Card
				withBorder
				radius="md"
				padding="lg"
				mb="md"
				style={{ borderColor: "var(--mantine-color-red-3)" }}
			>
				<Text fw={700} c="red">
					Link Keyの停止（アーカイブ）
				</Text>
				<Text size="sm" c="dimmed" mt="xs">
					卒業・休学・退会などで視聴記録の反映が不要になった場合に、Link
					Keyを停止できます。停止中は拡張機能との同期が行われず、キーも利用できません。いつでも再開できます。
				</Text>
				{archived ? (
					<Button
						mt="md"
						variant="default"
						leftSection={<IconRefresh size={14} />}
						onClick={() => setReactivateOpened(true)}
					>
						連携を再開する
					</Button>
				) : (
					<Button
						mt="md"
						color="red"
						variant="light"
						leftSection={<IconArchive size={14} />}
						onClick={() => setArchiveOpened(true)}
					>
						停止手続きに進む
					</Button>
				)}
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

			<Modal
				opened={archiveOpened}
				onClose={() => setArchiveOpened(false)}
				title="Link Keyを停止しますか？"
				centered
			>
				<Text size="sm" c="dimmed">
					停止すると拡張機能との同期が止まり、視聴記録が反映されなくなります。停止理由を選択してください。
				</Text>
				<Select
					label="停止理由"
					placeholder="理由を選択"
					data={archiveReasons}
					value={reason}
					onChange={(v) => setReason(v as ArchiveReason | null)}
					mt="md"
				/>
				<Group justify="flex-end" mt="lg">
					<Button variant="default" onClick={() => setArchiveOpened(false)}>
						キャンセル
					</Button>
					<Button
						color="red"
						disabled={reason === null}
						onClick={confirmArchive}
					>
						停止する
					</Button>
				</Group>
			</Modal>

			<Modal
				opened={reactivateOpened}
				onClose={() => setReactivateOpened(false)}
				title="連携を再開しますか？"
				centered
			>
				<Text size="sm" c="dimmed">
					Link
					Keyを有効化し、拡張機能との同期を再開します。同じキーがそのまま使えます。
				</Text>
				<Group justify="flex-end" mt="lg">
					<Button variant="default" onClick={() => setReactivateOpened(false)}>
						キャンセル
					</Button>
					<Button onClick={confirmReactivate}>再開する</Button>
				</Group>
			</Modal>
		</main>
	);
}

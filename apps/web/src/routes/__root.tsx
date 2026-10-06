import {
	ActionIcon,
	AppShell,
	Avatar,
	Burger,
	ColorSchemeScript,
	Group,
	Indicator,
	MantineProvider,
	mantineHtmlProps,
	TextInput,
	Tooltip,
	useMantineColorScheme,
} from "@mantine/core";
import mantineCoreStyles from "@mantine/core/styles.css?url";
import { useDisclosure } from "@mantine/hooks";
import { IconBell, IconMoon, IconSearch, IconSun } from "@tabler/icons-react";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { NavbarNested as Navbar } from "#/components/Navbar/Navbar";
import "../styles.css";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: "nhack dashboard" },
		],
		links: [{ rel: "stylesheet", href: mantineCoreStyles }],
	}),
	shellComponent: RootDocument,
});

function ColorSchemeToggle() {
	const { colorScheme, setColorScheme } = useMantineColorScheme();
	const dark = colorScheme === "dark";
	return (
		<Tooltip label={dark ? "ライトモードに切替" : "ダークモードに切替"}>
			<ActionIcon
				variant="default"
				size="lg"
				radius="md"
				aria-label="カラースキーム切替"
				onClick={() => setColorScheme(dark ? "light" : "dark")}
			>
				{dark ? <IconSun size={18} /> : <IconMoon size={18} />}
			</ActionIcon>
		</Tooltip>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	const [mobileOpened, { toggle: toggleMobile }] = useDisclosure(false);
	const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

	return (
		<html lang="ja" {...mantineHtmlProps}>
			<head>
				<ColorSchemeScript defaultColorScheme="auto" />
				<HeadContent />
			</head>
			<body>
				<MantineProvider defaultColorScheme="auto">
					<AppShell
						header={{ height: 60 }}
						navbar={{
							width: 300,
							breakpoint: "sm",
							collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
						}}
						padding="md"
					>
						<AppShell.Header>
							<Group h="100%" px="md" justify="space-between" wrap="nowrap">
								<Group wrap="nowrap">
									<Burger
										opened={mobileOpened}
										onClick={toggleMobile}
										hiddenFrom="sm"
										size="sm"
										aria-label="ナビゲーションを開閉"
									/>
									<Burger
										opened={desktopOpened}
										onClick={toggleDesktop}
										visibleFrom="sm"
										size="sm"
										aria-label="サイドバーを開閉"
									/>
									<TextInput
										placeholder="単元・時間割を検索…"
										leftSection={<IconSearch size={16} />}
										visibleFrom="xs"
										w={260}
									/>
								</Group>
								<Group gap="xs">
									<ColorSchemeToggle />
									<Tooltip label="通知">
										<Indicator
											inline
											size={8}
											offset={6}
											position="top-end"
											color="red"
											withBorder
										>
											<ActionIcon
												variant="default"
												size="lg"
												radius="md"
												aria-label="通知"
											>
												<IconBell size={18} />
											</ActionIcon>
										</Indicator>
									</Tooltip>
									<Avatar
										src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
										radius="xl"
										alt="ログインユーザー"
									/>
								</Group>
							</Group>
						</AppShell.Header>

						<AppShell.Navbar>
							<Navbar />
						</AppShell.Navbar>

						<AppShell.Main>{children}</AppShell.Main>
					</AppShell>
				</MantineProvider>
				<Scripts />
			</body>
		</html>
	);
}

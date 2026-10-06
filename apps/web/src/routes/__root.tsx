import {
	AppShell,
	ColorSchemeScript,
	MantineProvider,
	mantineHtmlProps,
} from "@mantine/core";
import mantineCoreStyles from "@mantine/core/styles.css?url";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { NavbarNested as Navbar } from "#/components/Navbar/Navbar";
import "../styles.css";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
		],
		links: [{ rel: "stylesheet", href: mantineCoreStyles }],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" {...mantineHtmlProps}>
			<head>
				<ColorSchemeScript />
				<HeadContent />
			</head>
			<body>
				<MantineProvider>
					<AppShell
						navbar={{
							width: 300,
							breakpoint: "sm",
						}}
						padding="md"
					>
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

import mantineCoreStyles from '@mantine/core/styles.css?url';

import { createRootRoute, HeadContent, Scripts } from '@tanstack/react-router';
import {
  AppShell,
  ColorSchemeScript,
  mantineHtmlProps,
  MantineProvider,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Navbar } from '#/components/Navbar/Navbar';
import Header from '#/components/Header';
import Footer from '#/components/Footer';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    links: [{ rel: 'stylesheet', href: mantineCoreStyles }],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <HeadContent />
      </head>
      <body>
        <MantineProvider>
          <AppShell
            header={{ height: 64 }}
            navbar={{
              width: 80,
              breakpoint: 'sm',
              collapsed: { mobile: !opened },
            }}
            padding={0}
          >
            <AppShell.Header>
              <Header withBurger opened={opened} onToggle={toggle} />
            </AppShell.Header>

            <AppShell.Navbar p="md">
              <Navbar />
            </AppShell.Navbar>

            <AppShell.Main>
              {children}
              <Footer />
            </AppShell.Main>
          </AppShell>
        </MantineProvider>
        <Scripts />
      </body>
    </html>
  );
}

import { Link, useRouterState } from '@tanstack/react-router';
import {
  IconCalendarStats,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconGauge,
  IconHome2,
  IconLogout,
  IconSettings,
  IconSwitchHorizontal,
  IconUser,
} from '@tabler/icons-react';
import { Center, Stack, Tooltip, UnstyledButton } from '@mantine/core';
import classes from './Navbar.module.css';

interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  active?: boolean;
  to?: string;
  onClick?: () => void;
}

function NavbarLink({ icon: Icon, label, active, to, onClick }: NavbarLinkProps) {
  const button = (
    <UnstyledButton
      onClick={onClick}
      className={classes.link}
      data-active={active || undefined}
      aria-label={label}
    >
      <Icon size={20} stroke={1.5} />
    </UnstyledButton>
  );

  const content = to ? (
    <Link to={to} style={{ textDecoration: 'none' }}>
      {button}
    </Link>
  ) : (
    button
  );

  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      {content}
    </Tooltip>
  );
}

const mockdata: Array<{ icon: typeof IconHome2; label: string; to?: string }> = [
  { icon: IconHome2, label: 'Home', to: '/' },
  { icon: IconGauge, label: 'Dashboard', to: '/about' },
  { icon: IconDeviceDesktopAnalytics, label: 'Analytics' },
  { icon: IconCalendarStats, label: 'Releases' },
  { icon: IconUser, label: 'Account' },
  { icon: IconFingerprint, label: 'Security' },
  { icon: IconSettings, label: 'Settings' },
];

export function Navbar() {
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  const links = mockdata.map((link) => {
    const isActive =
      link.to != null ? (link.to === '/' ? pathname === '/' : pathname.startsWith(link.to)) : false;
    return <NavbarLink {...link} key={link.label} active={isActive} />;
  });

  return (
    <nav className={classes.navbar}>
      <Center>
        {/*<MantineLogo type="mark" size={30} />*/}
      </Center>

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>

      <Stack justify="center" gap={0}>
        <NavbarLink icon={IconSwitchHorizontal} label="Change account" />
        <NavbarLink icon={IconLogout} label="Logout" />
      </Stack>
    </nav>
  );
}

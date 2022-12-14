import {
  AppShell,
  Navbar,
  useMantineTheme,
  Text,
  MediaQuery,
  Aside,
  Footer,
  Header,
  Burger,
  Button,
  NavLink,
  Switch,
} from "@mantine/core";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { AlertCircle, Eye, Heart, Home2, Settings } from "tabler-icons-react";
import { useThemeStore } from "../stores/themeStore";

type Props = {
  children: React.ReactNode;
};

export const Layout = (props: Props) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { data: session } = useSession();
  const { asPath } = useRouter();
  const { toggleTheme, isDark } = useThemeStore();

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 150, lg: 200 }}
        >
          <div className="flex flex-col h-full">
            <Link href="/">
              <NavLink
                label="Hjem"
                icon={<Home2 size={20} strokeWidth={1.5} />}
                active={asPath === "/"}
              />
            </Link>
            <Link href="/groups">
              <NavLink
                label="Mine grupper"
                icon={<Heart size={20} strokeWidth={1.5} />}
                active={asPath === "/groups"}
              />
            </Link>

            <Link href="/settings">
              <NavLink
                label="Innstillinger"
                icon={<Settings size={20} strokeWidth={1.5} />}
                active={asPath === "/settings"}
                className="mt-auto"
              />
            </Link>
          </div>
        </Navbar>
      }
      aside={
        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
            <Text>Application sidebar</Text>
          </Aside>
        </MediaQuery>
      }
      footer={
        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <Footer height={60} p="md">
            Application footer
          </Footer>
        </MediaQuery>
      }
      header={
        <Header height={70} p="md">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <div className="flex flex-1 ">
              <Link href="/">
                <button>
                  <Text className="text-3xl">Sameieportalen</Text>
                </button>
              </Link>
            </div>

            <div className="px-4 flex flex-col items-center">
              <Eye size={20} strokeWidth={1.5} />
              <Switch checked={isDark} onChange={(e) => toggleTheme()} />
            </div>
            {session?.user ? (
              <img className="rounded-full" src={session?.user?.image ?? ""} />
            ) : (
              <Button variant="default" onClick={() => signIn()}>
                Log in
              </Button>
            )}
          </div>
        </Header>
      }
    >
      {props.children}
    </AppShell>
  );
};

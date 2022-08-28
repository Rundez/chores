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
} from "@mantine/core";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

type Props = {
  children: React.ReactNode;
};

export const Layout = (props: Props) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { data: session, status } = useSession();

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
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 150, lg: 200 }}
        >
          <div>
            <Link href="/groups">Grupper</Link>
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
        <Footer height={60} p="md">
          Application footer
        </Footer>
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

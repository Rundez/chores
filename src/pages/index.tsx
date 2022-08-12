import {
  AppShell,
  Aside,
  Burger,
  Button,
  Card,
  Footer,
  Header,
  MediaQuery,
  Navbar,
  Text,
  useMantineTheme,
} from "@mantine/core";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const { data } = trpc.useQuery(["example.testKanta"]);

  return (
    <Card>
      <Text>
        {session?.user ? (
          `Logged in: ${session.user.email}`
        ) : (
          <Button>Log in</Button>
        )}
      </Text>
    </Card>
  );
};

export default Home;

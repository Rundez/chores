import {
  AppShell,
  Aside,
  Burger,
  Button,
  Card,
  Footer,
  Group,
  Header,
  Input,
  MediaQuery,
  Navbar,
  Text,
  useMantineTheme,
} from "@mantine/core";
import type { NextPage } from "next";
import { useSession, signIn } from "next-auth/react";
import { BaseSyntheticEvent, useEffect, useState } from "react";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const [group, setGroup] = useState("");
  const { data: session, status } = useSession();
  const { data } = trpc.useQuery(["public.getGroups"]);
  const { data: test } = trpc.useQuery(["protected.getUsers"]);
  const { data: testData, isLoading } = trpc.useQuery(["protected.helloKanta"]);

  console.log(testData);
  return (
    <Card className="p-4">
      <Text>{session?.user && `Logged in: ${session.user.email}`}</Text>
      <Group>
        <Input
          value={group}
          onChange={(e: BaseSyntheticEvent) => setGroup(e.target.value)}
        />
        <Button variant="default">Join/Create group</Button>
      </Group>
    </Card>
  );
};

export default Home;

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
import { useSession } from "next-auth/react";
import { BaseSyntheticEvent, SyntheticEvent, useState } from "react";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const [group, setGroup] = useState("");
  const { data: session, status } = useSession();
  const { data } = trpc.useQuery(["example.getGroups"]);
  const { data: users } = trpc.useQuery(["example.getUsers"]);

  console.log(data, "groups");
  console.log(users, "users");
  return (
    <Card>
      <Text>
        {session?.user ? (
          `Logged in: ${session.user.email}`
        ) : (
          <Button>Log in</Button>
        )}
      </Text>
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

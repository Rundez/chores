import { Button, Card, Text } from "@mantine/core";
import { useState } from "react";
import { AddGroupModal } from "../../components/AddGroupModal";
import { trpc } from "../../utils/trpc";

function Settings() {
  const { data } = trpc.useQuery(["protected.getGroups"]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col h-full gap-4">
      <Text size={"lg"} weight="bold" className="text-2xl">
        Innstillinger
      </Text>
    </div>
  );
}

export default Settings;

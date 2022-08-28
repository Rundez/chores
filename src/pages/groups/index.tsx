import { Button, Card, Text } from "@mantine/core";
import { useState } from "react";
import { AddGroupModal } from "../../components/AddGroupModal";
import { trpc } from "../../utils/trpc";

function Groups() {
  const { data } = trpc.useQuery(["protected.getGroups"]);
  const [isOpen, setIsOpen] = useState(false);

  console.log(data);
  return (
    <div className="flex flex-col h-full gap-4">
      <Text size={"lg"} weight="bold" className="text-2xl">
        Grupper
      </Text>
      <div className="flex flex-col gap-2">
        <Text>Mine grupper</Text>
        <div className="grid grid-cols-2 gap-4">
          {data?.map((grp) => (
            <Card
              shadow={"md"}
              className="transition duration-500 ease-in-out hover:scale-105  "
            >
              <Text>{grp.name}</Text>
            </Card>
          ))}
        </div>
      </div>
      <Button variant="outline" onClick={() => setIsOpen(true)}>
        Legg til gruppe
      </Button>
      <AddGroupModal open={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

export default Groups;

import { Button, Input, Modal } from "@mantine/core";
import { ChangeEvent, useEffect, useState } from "react";
import { trpc } from "../utils/trpc";

type Props = {
  open: boolean;
  onClose: () => void;
};
export const AddGroupModal = (props: Props) => {
  const { data, mutate } = trpc.useMutation(["protected.createGroup"]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const queryClient = trpc.useContext();

  useEffect(() => {
    if (data?.success) {
      queryClient.invalidateQueries(["protected.getGroups"]);
      props.onClose();
    }
  }, [data]);

  return (
    <Modal
      opened={props.open}
      onClose={() => props.onClose()}
      title="Legg til gruppe!"
    >
      <div className="flex flex-col gap-4">
        <Input
          placeholder="Navn"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
        <Input
          placeholder="Beskrivelse"
          value={description}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setDescription(e.target.value)
          }
        />
        <Button variant="outline" onClick={() => mutate({ description, name })}>
          Legg til
        </Button>
      </div>
    </Modal>
  );
};

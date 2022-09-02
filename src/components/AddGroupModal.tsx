import { Alert, Button, Loader, Modal, Text, TextInput } from "@mantine/core";
import { ChangeEvent, useEffect, useState } from "react";
import { trpc } from "../utils/trpc";
import { AlertCircle } from "tabler-icons-react";
import { z } from "zod";

type Props = {
  open: boolean;
  onClose: () => void;
};
export const AddGroupModal = (props: Props) => {
  const { mutate, error, isSuccess, isLoading, data } = trpc.useMutation([
    "protected.createGroup",
  ]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const queryClient = trpc.useContext();

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries(["protected.getGroups"]);
      props.onClose();
    }
  }, [isSuccess]);

  return (
    <Modal
      opened={props.open}
      onClose={() => props.onClose()}
      title="Legg til gruppe!"
    >
      <div className="flex flex-col gap-4">
        <TextInput
          label="Navn"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
        <TextInput
          label="Beskrivelse"
          value={description}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setDescription(e.target.value)
          }
        />
        <Button variant="outline" onClick={() => mutate({ description, name })}>
          Legg til
        </Button>

        {isLoading && (
          <div className="flex justify-center">
            <Loader />{" "}
          </div>
        )}
        {error && (
          <Alert
            color="red"
            title="Woops"
            radius="lg"
            icon={<AlertCircle />}
            className="p-4"
          >
            <Text>Det har skjedd en feil.. vennligst prøv igjen</Text>
          </Alert>
        )}
      </div>
    </Modal>
  );
};

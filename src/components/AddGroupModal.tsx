import { Modal } from "@mantine/core";
import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};
export const AddGroupModal = (props: Props) => {
  return (
    <Modal
      opened={props.open}
      onClose={() => props.onClose()}
      title="Legg til gruppe!"
    >
      <div>Nokre her</div>
    </Modal>
  );
};

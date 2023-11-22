import React, { ReactNode } from "react";
import { Modal as MuiModal, Box } from "@mui/material";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode | ReactNode[];
}

const style = {
  wrapper: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    justifyContent: "center",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 8,
    border: "1px solid #000",
    backgroundColor: "#27262C",
    boxShadow: 24,
    padding: "32px",
  },
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <MuiModal open={isOpen} onClose={onClose}>
      <Box p={2} sx={style.wrapper}>
        {children}
      </Box>
    </MuiModal>
  );
};

export default Modal;

import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "../components/Button";

interface SwitchToGoerliModalProps {
  isOpen: boolean;
  onClose: () => void;
  switchToGoerli: () => void;
}

const style = {
  wrapper: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },
};

const SwitchToGoerliModal: React.FC<SwitchToGoerliModalProps> = ({
  isOpen,
  onClose,
  switchToGoerli,
}) => {
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style.wrapper}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            color="black"
          >
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} color="black">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <Button label="Switch to goerli" onClick={switchToGoerli} />
        </Box>
      </Modal>
    </div>
  );
};

export default SwitchToGoerliModal;

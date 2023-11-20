import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "../components/Button";
import Image from "next/image";
import Alert from "@mui/material/Alert";
import { useWeb3 } from "../providers/web3";

interface SwitchToGoerliModalProps {
  isOpen: boolean;
  onClose: () => void;
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
  imageWrapper: {
    display: "flex",
    justifyContent: "center",
    my: "12px",
  },
  buttonStyle: {
    marginTop: "16px",
    width: "100%",
  },
};

const SwitchToGoerliModal: React.FC<SwitchToGoerliModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { switchToGoerli, disconnect } = useWeb3();
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
            variant="h5"
            fontWeight={700}
            component="h2"
            color="white"
          >
            Check your network
          </Typography>

          <Box sx={style.imageWrapper}>
            <Image
              src="/images/check-your-network.webp"
              alt="network-logo"
              style={{ objectFit: "contain" }}
              width={460}
              height={180}
              priority
            />
          </Box>
          <Alert severity="warning">
            Please switch your network to continue.
          </Alert>
          <Button
            label="Switch network"
            onClick={switchToGoerli}
            style={style.buttonStyle}
          />
          <Button
            label="Disconnect wallet"
            onClick={disconnect}
            style={style.buttonStyle}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default SwitchToGoerliModal;

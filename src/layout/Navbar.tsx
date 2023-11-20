import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";

import Button from "../components/Button";
import SwitchToGoerliModal from "../modals/SwitchToGoerliModal";
import { useWeb3 } from "../providers/web3";

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: "108px",
    width: "100vw",
    zIndex: 9,
    padding: 0,
    borderBottom: "1px solid #FFB87D",
    backgroundColor: "transparent",
  },
  logoWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 0,
    margin: 0,
  },
  connectionWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  connectButton: {
    marginRight: "32px",
    boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
  },
};

const Navbar = () => {
  const [showSwitchGoerliModal, setshowSwitchGoerliModal] = useState(false);
  const { quizBalance, isConnected, isGoerli, connectWallet, disconnect } =
    useWeb3();

  const handleConnect = async () => {
    if (!isConnected) await connectWallet();
  };

  useEffect(() => {
    setshowSwitchGoerliModal(isConnected && !isGoerli);
  }, [isConnected, isGoerli]);

  return (
    <>
      <Box sx={styles.wrapper}>
        <Box sx={styles.logoWrapper}>
          <Link href="/" passHref>
            <Image
              src="/images/logo.png"
              alt="main-logo"
              style={{ objectFit: "contain" }}
              width={260}
              height={140}
              priority
            />
          </Link>
        </Box>
        <Box sx={styles.connectionWrapper}>
          {isConnected && (
            <Typography
              id="modal-modal-title"
              variant="body1"
              fontWeight={700}
              component="h4"
              color="white"
              paddingRight="12px"
            >
              Quiz balance: ${quizBalance || 0}
            </Typography>
          )}

          <Button
            label={isConnected ? "Disconnect" : "Connect to Metamask"}
            onClick={isConnected ? disconnect : handleConnect}
            style={styles.connectButton}
          />
        </Box>
      </Box>
      <SwitchToGoerliModal
        isOpen={showSwitchGoerliModal}
        onClose={() => setshowSwitchGoerliModal(false)}
      />
    </>
  );
};

export default Navbar;

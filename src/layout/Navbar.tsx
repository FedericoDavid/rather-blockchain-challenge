"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Box from "@mui/system/Box";
import Button from "@mui/material/Button";
import { useWeb3 } from "../providers/web3";

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: "120px",
    width: "100vw",
    zIndex: 9,
    padding: 0,
    borderBottom: "1px solid #c1c1c1",
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
  connectButton: {
    marginRight: "32px",
    boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
  },
};

const Navbar = () => {
  const { isConnected, connectWallet, address } = useWeb3();

  const handleConnect = async () => {
    if (!isConnected) await connectWallet();
  };

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.logoWrapper}>
        <Link href="/" passHref>
          <Image
            src="/images/ratherlabs-logo.png"
            alt="main-logo"
            style={{ objectFit: "contain" }}
            width={260}
            height={140}
            priority
          />
        </Link>
      </Box>
      <Button
        variant="contained"
        onClick={handleConnect}
        sx={styles.connectButton}
      >
        {isConnected ? "connected" : "Connect to Metamask"}
      </Button>
    </Box>
  );
};

export default Navbar;

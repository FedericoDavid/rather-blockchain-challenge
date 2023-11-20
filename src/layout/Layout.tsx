import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";

import Navbar from "./Navbar";
import SwitchToGoerliModal from "../modals/SwitchToGoerliModal";
import { useWeb3 } from "../providers/web3";

const styles = {
  wrapper: {
    minHeight: "100vh",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={styles.wrapper}>
      <main>
        <Navbar />
        {children}
      </main>
      <footer></footer>
    </Box>
  );
};

export default Layout;

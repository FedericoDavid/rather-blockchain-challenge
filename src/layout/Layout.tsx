import React from "react";
import { Box } from "@mui/material";

import Navbar from "./Navbar";
import Footer from "./Footer";

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
      <Footer />
    </Box>
  );
};

export default Layout;

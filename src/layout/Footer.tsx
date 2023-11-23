import React from "react";
import { Box, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const styles = {
  wrapper: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "18px 24px 8px 24px",
    backgroundColor: "transparent",
    zIndex: 99,
    borderTop: "1px solid #c2c2c2",
    overflow: "hidden",
  },
  socialWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  socialLink: {
    margin: "8px",
    fontSize: "16px",
    fontWeight: 500,
    color: " #fff",
    textDecoration: "none",
  },
};

const Footer: React.FC = () => {
  return (
    <Box sx={styles.wrapper}>
      <Typography variant="body1">Enriquez Federico © 2023</Typography>
      <Box sx={styles.socialWrapper}>
        <a
          style={styles.socialLink}
          aria-label="Linkedin"
          href="https://www.linkedin.com/in/federico-d-enriquez/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <LinkedInIcon fontSize="small" />
        </a>
        <a
          style={styles.socialLink}
          aria-label="Github"
          href="https://github.com/FedericoDavid"
          rel="noopener noreferrer"
          target="_blank"
        >
          <GitHubIcon fontSize="small" />
        </a>
        <a
          style={styles.socialLink}
          aria-label="Email"
          href="mailto:fedenri98@gmail.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          <ContactMailIcon fontSize="small" />
        </a>
      </Box>
    </Box>
  );
};

export default Footer;

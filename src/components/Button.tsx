import React from "react";
import MaterialButton from "@mui/material/Button";
import { SxProps, Theme } from "@mui/material/styles";

interface ButtonProps {
  label: string;
  style?: SxProps<Theme>;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, style, onClick }) => {
  return (
    <MaterialButton variant="contained" onClick={onClick} sx={style}>
      {label}
    </MaterialButton>
  );
};

export default Button;

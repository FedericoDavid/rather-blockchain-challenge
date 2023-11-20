import React from "react";
import MaterialButton from "@mui/material/Button";
import { SxProps, Theme } from "@mui/material/styles";

interface ButtonProps {
  label: string;
  style?: SxProps<Theme>;
  onClick: () => void;
  variant?: "contained" | "text" | "outlined";
}

const Button: React.FC<ButtonProps> = ({
  label,
  style,
  onClick,
  variant = "contained",
}) => {
  return (
    <MaterialButton variant={variant} onClick={onClick} sx={style}>
      {label}
    </MaterialButton>
  );
};

export default Button;

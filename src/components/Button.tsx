import React from "react";
import MaterialButton from "@mui/material/Button";
import { SxProps, Theme } from "@mui/material/styles";

interface ButtonProps {
  label: string;
  style?: SxProps<Theme>;
  onClick?: () => void;
  type?: "button" | "reset" | "submit";
  variant?: "contained" | "text" | "outlined";
}

const Button: React.FC<ButtonProps> = ({
  label,
  style,
  onClick,
  variant = "contained",
  type = "button",
}) => {
  const defaultStyle = {
    fontWeight: 600,
    textTransform: "capitalize",
  };

  Object.assign(defaultStyle, style);

  return (
    <MaterialButton
      type={type}
      variant={variant}
      onClick={onClick}
      sx={defaultStyle}
    >
      {label}
    </MaterialButton>
  );
};

export default Button;

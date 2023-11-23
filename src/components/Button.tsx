import React from "react";
import MaterialButton from "@mui/material/Button";
import { SxProps, Theme } from "@mui/material/styles";

interface ButtonProps {
  label: string;
  style?: SxProps<Theme>;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "reset" | "submit";
  variant?: "contained" | "text" | "outlined";
}

const Button: React.FC<ButtonProps> = ({
  label,
  style,
  onClick,
  disabled = false,
  variant = "contained",
  type = "button",
}) => {
  const defaultStyle = {
    fontWeight: 600,
    textTransform: "capitalize",
    boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
  };

  Object.assign(defaultStyle, style);

  return (
    <MaterialButton
      type={type}
      variant={variant}
      onClick={onClick}
      sx={defaultStyle}
      disabled={disabled}
    >
      {label}
    </MaterialButton>
  );
};

export default Button;

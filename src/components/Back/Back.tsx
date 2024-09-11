import { ButtonHTMLAttributes, ReactNode } from "react";
import { Button, SxProps } from "@mui/material";
import { Link } from "react-router-dom";
import { E_ROUTES } from "../../types/types";

interface I_Back extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  sx?: SxProps;
  variant?: "contained" | "outlined" | "text" | string;
  to: E_ROUTES | string;
}

const BackButtonStyles = {
  color: "whitesmoke",
};

export const Back = ({
  children,
  sx,
  to,
  variant = "contained",
  ...props
}: I_Back) => {
  return (
    <Link to={to}>
      <Button
        {...props}
        component="button"
        sx={{ ...BackButtonStyles, ...sx }}
        color="success"
        variant={variant}
      >
        {children}
      </Button>
    </Link>
  );
};

import { ButtonHTMLAttributes, ReactNode } from "react";
import { Button, SxProps } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Link } from "react-router-dom";
import { E_ROUTES } from "../../types/types";

interface I_Back extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  sx?: SxProps;
  variant?: "contained" | "outlined" | "text";
  to?: E_ROUTES | string;
}

export const Back = ({
  children,
  sx,
  to,
  variant = "contained",
  ...props
}: I_Back) => {
  return (
    <Link to={to as string}>
      {/* @ts-ignore */}
      <Button
        {...props}
        sx={{
          color: "whitesmoke",
          pl: "10px",
          pr: "10px",
          background: "var(--app-backBtn-bg)",
          ...sx,
        }}
        variant={variant}
      >
        <ArrowBackIosNewIcon fontSize="medium" color="inherit" />
        {children}
      </Button>
    </Link>
  );
};

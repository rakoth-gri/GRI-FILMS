import { ButtonHTMLAttributes, ReactNode } from "react";
import { Button, SxProps } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Link } from "react-router-dom";
import { E_ROUTES } from "../../types/types";

interface I_Back extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  sx?: SxProps;
  variant?: "contained" | "outlined" | "text" | string;
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
    <Link to={to}>
      <Button
        {...props}
        component="button"
        sx={{ color: "whitesmoke", pl: '10px', pr: '10px', background: 'linear-gradient(90deg, #00b58d,#00775b,#00775b)', ...sx }}
        variant={variant}
      >
        <ArrowBackIosNewIcon fontSize="medium" color='inherit'/>
        {children}
      </Button>
    </Link>
  );
};

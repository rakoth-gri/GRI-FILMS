import { AnchorHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
// types
import { SxProps, Theme } from "@mui/material";
import "./LinkButton.sass";

interface I_LinkButton extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: ReactNode;
  id?: string | number;
  route: string;
  sx?: SxProps<Theme> | undefined;
  variant?: "contained" | "outlined" | "text" | string;
  linkProps?: string
}

export const LinkButton = ({
  children,
  id,
  route,
  linkProps,
  variant = "contained",
  ...props
}: I_LinkButton) => {
  return (
    <Button
      size="medium"
      component={Link}
      to={`${route}/${id}`}
      variant={variant}
      state={linkProps}
      {...props}
    >
      {children}
    </Button>
  );
};



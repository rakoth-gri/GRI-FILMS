import { AllHTMLAttributes, ReactNode } from "react";
import { Typography, SxProps } from "@mui/material";

const MyTitleStyles = {
  margin: "0.5rem",
  textTransform: "uppercase",
  fontFamily: "Montserrat",
};

interface I_Title extends AllHTMLAttributes<HTMLTitleElement> {
  component?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning"
    | "textPrimary"
    | "textSecondary"
    | "textDisabled"
    | string;
  align?: "center" | "inherit" | "justify" | "left" | "right";
  children: ReactNode;
  sx?: SxProps | undefined;
  variant:
    | "body1"
    | "body2"
    | "button"
    | "caption"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "inherit"
    | "overline"
    | "subtitle1"
    | "subtitle2"
    | string;
}

export const MyTitle = ({
  children,
  component = "h1",
  align = "center",
  color = "primary",
  sx,
  ...props
}: I_Title) => {
  return (
    <Typography
      {...props}
      component={component}
      align={align}
      color={color}
      sx={{...MyTitleStyles, ...sx}}
    >
      {children}
    </Typography>
  );
};

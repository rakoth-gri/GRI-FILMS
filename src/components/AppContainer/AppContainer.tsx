import { HTMLAttributes, ReactNode } from "react";
import { Container } from "@mui/material";

const appContainerStyles = (props: Record<string, unknown>) => ({
  fontSize: props.fs || "inherit",
  color: props.color || "inherit",
  fontFamily: props.ff || "inherit",
  padding: { xs: "0.5rem", md: props.pd || "1rem" },
  margin: props.mr,
  width: { xs: "100%", sm: "95%", md: props.w || "90%" },
  background: props.bg || "inherit",
  minHeight: props.h || "auto",
  position: "relative",
});

interface I_MyAppContainer extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  fs?: string;
  ff?: string;
  color?: string;
  pd?: string;
  mr?: string;
  w?: string;
  h?: string;
  bg?: string;
}

export const AppContainer = ({ children, ...props }: I_MyAppContainer) => {
  return (
    <Container
      // @ts-ignore
      sx={appContainerStyles(props)}
      component={"main"}
      maxWidth={false}
      {...props}
    >
      {children}
    </Container>
  );
};

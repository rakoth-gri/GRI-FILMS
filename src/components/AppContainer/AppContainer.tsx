import { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { Container } from "@mui/material";

const getMyContainerProps = (
  mr: string,
  pd: string,
  w: string,
  color: string,
  bg: string,
  ff: string,
  fs: string,
  h: string,
): CSSProperties => ({
  fontSize: fs,
  color,
  fontFamily: ff,
  padding: pd,
  margin: mr,
  width: w,
  background: bg,
  minHeight: h,
  position: 'relative'
});

interface I_MyContainer extends HTMLAttributes<HTMLDivElement> {
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

export const AppContainer = ({
  children,
  mr = "1rem auto",
  pd = "1rem",
  w = "90%",
  color = "inherit",
  bg = "inherit",
  ff = "inherit",
  fs = "inherit",
  h = 'auto',
  ...props
}: I_MyContainer) => {
  return (
    <Container
      component={"main"}
      maxWidth={false}
      {...props}
      sx={getMyContainerProps(mr, pd, w, color, bg, ff, fs, h)}
    >
      {children}
    </Container>
  );
};

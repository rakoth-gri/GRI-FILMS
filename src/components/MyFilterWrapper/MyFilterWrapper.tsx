import { HTMLAttributes, ReactNode } from "react";
import { MyFlexContainer } from "../MyFlexContainer";
import { Box, SxProps, Theme } from "@mui/material";

const MyFilterWrapperStyles = (isOpenFilter: boolean) => ({
  willChange: "transform",
  position: "fixed",
  top: "0%",
  left: "0%",  
  bgcolor: "#4a148c",
  height: "100vh",
  zIndex: 4,
  color: "white",
  overflowY: "auto",
  transition: "0.3s transform ease",
  transform: isOpenFilter
    ? "translate3d(0%, 0px, 0px)"
    : "translate3d(-100%, 0px, 0px)",
});

interface I_MyFilterWrapper extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  isOpenFilter: boolean;
  sx?: SxProps<Theme>
}

export const MyFilterWrapper = ({
  children,
  isOpenFilter,
  sx,
  ...props
}: I_MyFilterWrapper) => {
  return (
    <MyFlexContainer
      sx={{ ...MyFilterWrapperStyles(isOpenFilter), ...sx }}
      w="30%"
      component="aside"
      {...props}
    >
      {children}
    </MyFlexContainer>
  );
};

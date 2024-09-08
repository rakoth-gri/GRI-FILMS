import {HTMLAttributes, ReactNode} from "react";
import { MyFlexContainer } from "../MyFlexContainer";
import { Box } from "@mui/material";

const filterWrapper = (isOpenFilter: boolean) => ({
  willChange: "transform",
  position: "fixed",
  top: "0%",
  left: "0%",
  p: "0px",
  bgcolor: "#4a148c",
  height: "100vh",
  zIndex: 4,
  color: "white",
  transition: "0.3s transform ease",
  transform: isOpenFilter
    ? "translate3d(0%, 0px, 0px)"
    : "translate3d(-100%, 0px, 0px)",
});

const filterBox = {
  width: "100%",
  height: "100vh",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.5rem",
  padding: "2rem 0px",
  cursor: "pointer",
};

interface I_MyFilterWrapper extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    isOpenFilter: boolean;
}

export const MyFilterWrapper = ({children, isOpenFilter, ...props}: I_MyFilterWrapper) => {
  return (
    <MyFlexContainer
      sx={filterWrapper(isOpenFilter)}
      w="30%"
      component="aside"      
      {...props}
    >
      <Box sx={filterBox}>
        {children}
      </Box>
    </MyFlexContainer>
  );
};

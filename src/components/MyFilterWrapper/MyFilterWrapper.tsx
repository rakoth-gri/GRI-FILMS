import { HTMLAttributes, ReactNode } from "react";
import { MyFlexContainer } from "../MyFlexContainer";
import { SxProps, Theme} from "@mui/material";

const getMyFilterWrapperStyles = (isOpenFilter: boolean) => ({
  willChange: "transform",
  position: "fixed",
  top: "0%",
  left: "0%",
  background: "var(--app-filterWrapper-bg)",
  height: "100vh",
  zIndex: 4,
  color: "white",
  overflowY: "auto",
  transition: "0.3s transform ease",
  transform: isOpenFilter
    ? "translate3d(0%, 0px, 0px)"
    : "translate3d(-100%, 0px, 0px)",
  fontSize: { xs: "13px", sm: "14.4px" },
  width: { xs: "65%", sm: "55%", md: "45%", lg: "35%" },
});

interface I_MyFilterWrapper extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  isOpenFilter: boolean;
  sx?: SxProps<Theme>;
}

export const MyFilterWrapper = ({
  children,
  isOpenFilter,
  sx,
  ...props
}: I_MyFilterWrapper) => {
  return (
    <MyFlexContainer      
      component="aside"
      sx={{ ...getMyFilterWrapperStyles(isOpenFilter), ...sx }}
      {...props}
    >
      {children}
    </MyFlexContainer>
  );
};

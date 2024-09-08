import {ReactNode, HTMLAttributes} from "react";
// components:
import { MyFlexContainer } from "../MyFlexContainer";
// types:
import { SxProps, Theme } from "@mui/material";

const imageFlexContainer = {
    position: "fixed",
    top: "0%",
    left: "0%",
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0, .75)",
    zIndex: 5,
    backdropFilter: "blur(1.5px)",
    color: "whitesmoke",
  };

interface I_MyModalWrapper extends HTMLAttributes<HTMLElement> {
    children: ReactNode
    sx?: SxProps<Theme>
}

export const MyModalWrapper = ({children, sx, ...props}: I_MyModalWrapper) => {
  return (
    <MyFlexContainer
      sx={{...imageFlexContainer, ...sx}}
      direction="column"
      spacing={3}
      {...props}
    >
        {children}
    </MyFlexContainer>
  );
};

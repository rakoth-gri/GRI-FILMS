import { ReactNode, CSSProperties, HTMLAttributes } from "react";
import { Stack } from "@mui/material";
// types
import { SxProps, Theme } from "@mui/material";
import "./MyFlexContainer.sass"

const getMyFlexContainerProps = (justify: I_MyFlexContainer['justify'], align: I_MyFlexContainer['align'], direction: I_MyFlexContainer['direction'], w: I_MyFlexContainer['w'], wrap: I_MyFlexContainer['wrap']): CSSProperties => ({
  justifyContent: justify,
  padding: "0.5rem",
  flexWrap: wrap,
  alignItems: align,
  flexDirection: direction,
  width: w,
});

interface I_MyFlexContainer extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  align?: "center" | "stretch" | "start" | "end";
  justify?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  spacing?: number;
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  w?: string;
  wrap?: 'wrap' | 'nowrap';
  sx?: SxProps<Theme> 
}

export const MyFlexContainer = ({
  children,
  align = "center",
  justify = "center",
  spacing = 2,
  direction = 'row',
  w = '100%',
  wrap = 'wrap',
  sx,  
  ...props
}: I_MyFlexContainer) => {
  return (
    <Stack
      component="section"
      sx={{...getMyFlexContainerProps(justify, align, direction, w, wrap), ...sx}}      
      spacing={spacing}
      useFlexGap={true}
      {...props}
    >
      {children}
    </Stack>
  );
};

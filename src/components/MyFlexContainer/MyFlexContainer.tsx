import { ReactNode, HTMLAttributes } from "react";
import { Stack } from "@mui/material";
// types
import { SxProps, Theme } from "@mui/material";
import "./MyFlexContainer.sass";

const getMyFlexContainerProps = (
  justify: I_MyFlexContainer["justify"],
  align: I_MyFlexContainer["align"],
  direction: I_MyFlexContainer["direction"],
  w: I_MyFlexContainer["w"],
  wrap: I_MyFlexContainer["wrap"],
  pd: I_MyFlexContainer["pd"],
  mr: I_MyFlexContainer["mr"]
) => ({
  justifyContent: justify,
  flexWrap: wrap,
  alignItems: align,
  flexDirection: direction,
  width: w,
  padding: pd,
  margin: mr,
  color: "var(--app-defult-color)",
  background: "var(--app-defult-bg)",
});

interface I_MyFlexContainer extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  align?: "center" | "stretch" | "start" | "end" | Record<string, unknown>;
  justify?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | Record<string, unknown>;
  spacing?: number | Record<string, number>;
  direction?:
    | "row"
    | "column"
    | "row-reverse"
    | "column-reverse"
    | Record<string, unknown>;
  w?: string | Record<string, unknown>;
  wrap?: "wrap" | "nowrap" | Record<string, unknown>;
  sx?: SxProps<Theme>;
  component?: string;
  pd?: string | Record<string, unknown>;
  mr?: string | Record<string, unknown>;  
}

export const MyFlexContainer = ({
  children,
  pd = "0.5rem",
  mr = "0.5rem",
  align = "center",
  justify = "center",
  spacing = 2,
  component = "section",
  direction = "row",
  w = "100%",
  wrap = "wrap",
  sx,
  ...props
}: I_MyFlexContainer) => {
  return (
    <Stack
      component="section"
      sx={{
        ...getMyFlexContainerProps(justify, align, direction, w, wrap, pd, mr),
        ...sx,
      }}
      spacing={spacing}
      useFlexGap={true}
      {...props}
    >
      {children}
    </Stack>
  );
};

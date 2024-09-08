import { HTMLAttributes, ReactNode } from "react";
import { Box } from "@mui/material";
import { colors } from "@mui/material";

const MyErrorSX = {
  color: colors.red[600],
  textTransform: "uppercase",
  fontSize: "1.15em",
  textAlign: 'center'
};

interface I_MyError extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const MyError = ({ children, ...props }: I_MyError) => {
  return (
    <Box component={"article"} {...props} sx={MyErrorSX}>
      {children}
    </Box>
  );
};

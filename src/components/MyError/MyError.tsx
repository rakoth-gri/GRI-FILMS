import { HTMLAttributes, ReactNode } from "react";
import { Box } from "@mui/material";
import { colors } from "@mui/material";

const MyErrorStyles = {
  color: colors.red[600],
  textTransform: "uppercase",
  fontSize: "1.15em",
  textAlign: 'center',
  m: '1rem 0'
};

interface I_MyError extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const MyError = ({ children, ...props }: I_MyError) => {
  return (
    <Box component={"article"} {...props} sx={MyErrorStyles}>
      {children}
    </Box>
  );
};

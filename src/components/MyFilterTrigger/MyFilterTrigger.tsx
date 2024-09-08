import { HTMLAttributes } from "react";
// components
import { Box, Button } from "@mui/material";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";

const buttonStyles = { letterSpacing: "1px", fontSize: "1.05em" };

interface I_MyFilterTrigger extends HTMLAttributes<HTMLDivElement> {}

export const MyFilterTrigger = ({ ...props }: I_MyFilterTrigger) => {
  return (
    <Box {...props}>
      <Button sx={buttonStyles}>
        {" "}
        Фильтр: <TuneRoundedIcon fontSize="large" />{" "}
      </Button>
    </Box>
  );
};

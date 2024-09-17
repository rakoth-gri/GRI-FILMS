import { HTMLAttributes } from "react";
// components
import { Box, Button} from "@mui/material";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";

const MyFilterTriggerStyles = {
  letterSpacing: "1px",
  fontSize: {xs: "12px", md: '1em', lg: '1.06em'},  
};

interface I_MyFilterTrigger extends HTMLAttributes<HTMLDivElement> {}

export const MyFilterTrigger = ({ ...props }: I_MyFilterTrigger) => {
  return (
    <Box {...props}>
      <Button sx={MyFilterTriggerStyles}>
        {" "}
        Фильтр: <TuneRoundedIcon fontSize="large" />{" "}
      </Button>
    </Box>
  );
};

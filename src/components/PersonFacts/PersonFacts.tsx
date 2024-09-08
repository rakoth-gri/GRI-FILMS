import { Fragment, useState } from "react";
import { colors } from "@mui/material";
import {
  Accordion,
  AccordionSlots,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Fade,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MyTitle } from "../MyTitle";
import { Render } from "../Render";

const BoxSX = {
  height: "auto",
  letterSpacing: "0.75px",
};

export function PersonFacts({ facts }: { facts: string[] }) {  

  return (
    <Box sx={BoxSX}>
      <MyTitle variant="h4" color="inherit">
        {" "}
        Факты{" "}
      </MyTitle>
      {facts.map((fact, i) => (
        <Fragment key={i}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon color={`primary`} component="svg" />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{
                fontWeight: 500,
                "&:hover": {
                  border: `1px solid ${colors.teal[50]}`,
                },
              }}
            >
              Факт {i + 1}:
            </AccordionSummary>
            <AccordionDetails>{fact}</AccordionDetails>
          </Accordion>
        </Fragment>
      ))}
    </Box>
  );
}

import { Fragment} from "react";
import { colors, SxProps } from "@mui/material";
// components:
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


const REGEX = /(<([^>]+)>)/gi;

const factsBoxstyles = {
  height: "auto",
  letterSpacing: "0.75px",
  color: 'inherit',
  backgroundColor: 'inherit'
};

const factsAccordionStyles = {
  letterSpacing: "0.7px",
  lineHeight: "1.45em",
  fontWeight: 500,
  textAlign: "justify",
};

interface I_MyFacts {
  facts: string[];
  sx?: SxProps;
}

export function MyFacts({ facts, sx }: I_MyFacts) {
  return (
    <Box sx={{ ...factsBoxstyles, ...sx }}>      
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
            <AccordionDetails sx={factsAccordionStyles}>
              {fact.replace(REGEX, '')}
            </AccordionDetails>
          </Accordion>
        </Fragment>
      ))}
    </Box>
  );
}

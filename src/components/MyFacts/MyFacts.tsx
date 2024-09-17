import { SxProps } from "@mui/material";
// components:
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const REGEX = /(<([^>]+)>)/gi;

const MyFactsStyles = {
  height: "auto",
  letterSpacing: "0.75px",  
};

const MyFactsAccordionDetailStyles = { 
  lineHeight: "1.45em",
  fontWeight: 500,
  textAlign: "justify",
  fontSize: 'inherit',
};

const MyFactsAccordionSummaryStyles = {
  m: '0.5rem 0px',
  borderBottomColor: 'transparent',
  fontWeight: 500,
  fontSize: 'inherit',
  "&:hover": {
    border: `1px solid`,
  },
}

interface I_MyFacts {
  facts: string[];
  sx?: SxProps;
}

export function MyFacts({ facts, sx }: I_MyFacts) {
  return (
    <Box sx={{ ...MyFactsStyles, ...sx }}>
      {facts.map((fact, i) => (
        <Accordion key={i} sx={{bgcolor: 'transparent', color: 'inherit'}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon color={`primary`} component="svg" />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={MyFactsAccordionSummaryStyles}
          >
            Факт {i + 1}:
          </AccordionSummary>
          <AccordionDetails sx={MyFactsAccordionDetailStyles}>
            {fact.replace(REGEX, "")}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}

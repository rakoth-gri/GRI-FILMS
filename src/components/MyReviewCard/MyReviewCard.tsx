import { ReactNode } from "react";
// components:
import { Box, Divider } from "@mui/material";
import { MyFlexContainer } from "../MyFlexContainer";
import { MyTitle } from "../MyTitle";
import { Span } from "../Span/Span";
// types:
import { I_REVIEW } from "../../types/types";
// utils
import { getBoxStyles } from "../../services/utils";

const MyReviewCardReviewStyles = {
  ...getBoxStyles({ pd: "0.5rem", ta: "justify", mr: "0px" }),
  lineHeight: "1.45em",
  letterSpacing: "0.7px",
  textIndent: "0.25rem",
  textTransform: "none",
  fontSize: { xs: "13px", md: "1em" },
};

const MyReviewCardHeaderStyles = {
  ...getBoxStyles({
    display: "flex",
    justify: "space-between",
    direction: "space-between",
    pd: "0px",
    width: "100%",
    mr: "0.25rem 0px",
    fs: { xs: "13.6px", md: "1.07em" },
    fw: 700,
  }),
  letterSpacing: "0.5px",
  textTransform: "uppercase",
};

const REGEX = /(<([^>]+)>)/gi;

const processingReview = (s: string, cb: (s: string, i: number) => ReactNode) =>
  s
    .split("\r\n")
    .filter((s) => s)
    .map(cb);

export const MyReviewCard = ({
  id,
  review,
  authorId,
  author,
  title,
  date,
}: I_REVIEW) => {
  return (
    <>
      <MyFlexContainer
        spacing={0}
        direction="column"
        align={"start"}
        component={"article"}
        mr={{ xs: "0px" }}
      >
        <Box sx={MyReviewCardHeaderStyles}>
          {author}
          <time> {date ? new Date(date).toLocaleString() : null} </time>
        </Box>
        <MyTitle
          component={"h4"}
          variant="subtitle"
          sx={{
            m: "0.5em 0px",
            fontSize: { xs: "15px", md: "1em", textAlign: "left" },
          }}
        >
          {title && (
            <blockquote cite={author}>
              {" "}
              <em>
                {" "}
                <q> {title}</q>{" "}
              </em>{" "}
            </blockquote>
          )}
        </MyTitle>
        <blockquote cite="http://kinopoisk.ru" title="ТЕКСТ ОТЗЫВА">
          <Box component={"p"} sx={MyReviewCardReviewStyles}>
            {processingReview(review, (s: string, i: number) => (
              <Span style={{ padding: "0.25rem" }} key={i}>
                {" "}
                {s.replace(REGEX, "")}{" "}
              </Span>
            ))}
          </Box>
        </blockquote>
      </MyFlexContainer>
      <Divider sx={{ width: "100%" }} />
    </>
  );
};

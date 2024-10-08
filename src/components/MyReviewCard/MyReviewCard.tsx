import React from "react";
// components:
import { Box, Divider } from "@mui/material";
import { MyFlexContainer } from "../MyFlexContainer";
import { MyTitle } from "../MyTitle";
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
};

const MyReviewCardHeaderStyles = {
  ...getBoxStyles({
    display: "flex",
    justify: "space-between",
    direction: "space-between",
    pd: "0px",
    width: "100%",
    mr: "0.25rem 0px",
    fs: "1.07em",
    fw: 700
  }),  
  letterSpacing: "0.5px",
  textTransform: "uppercase",
};

const REGEX = /(<([^>]+)>)/gi;

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
      >
        <Box sx={MyReviewCardHeaderStyles}>
          {author}
          <time> {date ? new Date(date).toLocaleString() : null} </time>
        </Box>
        <MyTitle component={"h4"} variant="subtitle" sx={{ m: "0.5em 0px" }}>
          <blockquote cite={author}>
            {" "}
            <em>
              {" "}
              <q> {title}</q>{" "}
            </em>{" "}
          </blockquote>
        </MyTitle>
        <blockquote          
          cite="http://kinopoisk.ru"
          title="ТЕКСТ ОТЗЫВА"
        >
          <Box component={"p"} sx={MyReviewCardReviewStyles}>
            {" "}
            <q>{review.slice(0).replace(REGEX, "")}...</q>
          </Box>
        </blockquote>
      </MyFlexContainer>
      <Divider sx={{width: '100%'}}/>
    </>
  );
};

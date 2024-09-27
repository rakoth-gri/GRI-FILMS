import { HTMLAttributes } from "react";
import { Box } from "@mui/material";
import { MyTitle } from "../MyTitle";
import { Span } from "../Span/Span";
// utils
import { getBoxStyles } from "../../services/utils";

const getMyMovieCardTooltipStyles = (visible: boolean) => ({
  fontSize: "0.85em",
  display: visible ? 'flex': "none",
  flexDirection: "row",
  position: "absolute",
  top: "4%",
  left: "30%",
  zIndex: 5,
  background: "var(--app-default-bg)",
  color: "var(--app-default-color)",
  borderRadius: "0.5rem",
  p: "0.5rem",
});

interface I_MyMovieCardTooltip extends HTMLAttributes<HTMLDivElement> {
  enName: string;
  top250: number;
  description?: string;
  ratingKp: number;
  ratingImdb: number;
  type: string;
  genres: string[];
  countries: string[];
  year: number;
  visible: boolean;
}

export const MyMovieCardTooltip = ({
  top250,
  ratingKp,
  ratingImdb,
  description,
  countries,
  type,
  genres,
  enName,
  year,
  visible,
  ...props
}: I_MyMovieCardTooltip) => {
  return (
    <Box
      component={"article"}
      sx={{
        ...getBoxStyles({ justify: "space-between", width: "70%" }),
        ...getMyMovieCardTooltipStyles(visible),
      }}
      {...props}
    >
      <MyTitle
        variant="subtitle"
        sx={{
          fontWeight: "bold",
          fontSize: { xs: "0.85em", lg: "1.05em" },
          width: "100%",
        }}
      >
        {" "}
        еще факты:
      </MyTitle>
      <Span cls="title">Год Релиза:</Span>
      <Span cls="desc">{year}</Span>
      <Span cls="title"> ТОП 250: </Span>
      <Span cls="desc"> {top250 || "-"} </Span>
      <Span cls="title">Рейтинг IMDB </Span>
      <Span cls="desc"> {ratingImdb} </Span>
      <Span cls="title">Рейтинг KP </Span>
      <Span cls="desc"> {ratingKp} </Span>
      <Span cls="title"> Тип Картины </Span>
      <Span cls="desc"> {type} </Span>
      <Span cls="title"> Англ. название </Span>
      <Span cls="desc"> {enName} </Span>
      <Span cls="title"> Жанр </Span>
      <Span cls="desc"> {genres.join(", ")}</Span>
      <Span cls="title"> Страна</Span>
      <Span cls="desc"> {countries.join(", ")}</Span>
    </Box>
  );
};

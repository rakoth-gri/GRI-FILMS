import { memo, useState } from "react";
// REDUX
import { addToFavorites } from "../../store/movieSlice";
import { useAppSelector, useAppDispatch } from "../../store/store";
// components:
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  styled,
} from "@mui/material";
import GradeIcon from "@mui/icons-material/Grade";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { MyLabel } from "../MyLabel";
import { LinkButton } from "../LinkButton";
import { MyMovieCardTooltip } from "../MyMovieCardTooltip";
import { colors } from "@mui/material";
// types:
import { E_ROUTES, I_MOVIE } from "../../types/types";
import { MyTitle } from "../MyTitle";

const MyCard = styled(Card)(({ theme }) => ({
  overflow: "initial",
  width: "27%",
  height: 470,
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  position: "relative",
  background: "inherit",
  color: "inherit",
  [theme.breakpoints.down("lg")]: {
    width: "45%",
  },
  [theme.breakpoints.down("md")]: {
    height: 455,
    width: "48.4%",
    fontSize: "11.9px",
  },
  [theme.breakpoints.down("sm")]: {
    height: 410,
    width: "85%",
  },
}));

const MyCardMedia = styled(CardMedia)(() => ({
  height: "100%",
  objectFit: "cover",
  borderRadius: "0.4rem",
  filter: "grayscale(50%)",
  "&:hover": { filter: "none" },
}));

const MyMoviesCardChipStyles = {
  border: "none",
  color: "var(--app-default-color)",
  fontSize: "inherit",
  m: { xs: "0px" },
  marginLeft: "0px",
};

const MyMoviesCardFavoriteIconStyles = {
  position: "absolute",
  bottom: "2%",
  left: "3%",
  color: colors.red[500],
  cursor: "pointer",
  "&:hover": {
    transform: "scale(1.05)",
  },
};

export const MyMovieCard = memo(
  ({
    id,
    name,
    enName,
    shortDescription,
    countries,
    description,
    ageRating,
    poster,
    movieLength,
    ratingKp,
    ratingImdb,
    top250,
    year,
    type,
    genres,
  }: I_MOVIE) => {
    const dispatch = useAppDispatch();

    const isFavoriteMovie = useAppSelector(
      (s) => s.movieSliceReducer.favorites
    ).find((f) => f.id === id);

    const [visible, setIsVisible] = useState(false);

    const favorClickHandler = () => {
      dispatch(
        addToFavorites({
          id,
          name,
          enName,
          shortDescription,
          countries,
          description,
          ageRating,
          poster,
          movieLength,
          ratingKp,
          ratingImdb,
          top250,
          year,
          type,
          genres,
        } as I_MOVIE)
      );
    };

    return (
      <MyCard
        // @ts-ignore
        component={"article"}
      >
        <MyLabel
          sx={{
            top: "2%",
            left: "2%",
            background: "green",
            color: "white",
            padding: "0.25rem",
            fontFamily: "Merienda",
          }}
        >
          {" "}
          {ageRating}+{" "}
        </MyLabel>
        <MyLabel
          sx={{
            top: "2%",
            right: "2%",
            background: "green",
            fontFamily: "Merienda",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            color: "white",
            p: "0.25rem",
          }}
        >
          <AccessTimeFilledIcon sx={{ mr: "0.5rem" }} />
          {movieLength}
        </MyLabel>
        <MyLabel
          sx={{
            top: "10%",
            left: "2%",
            backgroundColor: "rgba(0,0,0, .12)",
            fontFamily: "Merienda",
            backdropFilter: "blur(1px)",
            fontWeight: 700,
          }}
        >
          {" "}
          {top250 ? `TOP ${top250}` : null}
        </MyLabel>
        <Box
          sx={{ position: "relative", height: "59%" }}
          onMouseEnter={() => setIsVisible((p) => !p)}
          onMouseLeave={() => setIsVisible((p) => !p)}
        >
          <MyCardMedia
            // image={poster}
            data-src={poster}
            title={enName}
            // @ts-ignore
            component="img"
            className="cardImage"
          />
          {isFavoriteMovie ? (
            <FavoriteIcon
              fontSize="large"
              sx={MyMoviesCardFavoriteIconStyles}
              onClick={favorClickHandler}
            />
          ) : (
            <FavoriteBorderIcon
              fontSize="large"
              sx={MyMoviesCardFavoriteIconStyles}
              onClick={favorClickHandler}
            />
          )}
          <MyMovieCardTooltip
            enName={enName}
            description={description}
            ratingKp={ratingKp}
            ratingImdb={ratingImdb}
            type={type}
            top250={top250}
            year={year}
            genres={genres}
            countries={countries}
            className={"tooltip"}
            visible={visible}
          />
        </Box>
        <CardContent sx={{ padding: "0.5rem" }}>
          <MyTitle
            variant="subtitle2"
            component="h3"
            sx={{ m: "0 0 0.5rem 0", fontSize: "1em" }}
          >
            {name}
          </MyTitle>
          <Typography
            variant="body2"
            sx={{
              color: "secondary",
              textAlign: "justify",
              fontSize: { xs: "1em", md: "0.9em" },
            }}
            component="p"
          >
            {shortDescription} ( <strong> {year} г. </strong>)
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "space-around" }}>
          <LinkButton
            id={`${id}`}
            route={E_ROUTES.movies}
            sx={{
              border: "none",
              fontSize: "9px",
              background: "var(--app-card-bg)",
            }}
          >
            {" "}
            подробнее{" "}
          </LinkButton>
          <Chip
            label={`IMDB ${ratingImdb.toFixed(1)}`}
            icon={<GradeIcon color="warning" />}
            variant="outlined"
            sx={MyMoviesCardChipStyles}
          />
          <Chip
            label={`KP ${ratingKp.toFixed(1)}`}
            icon={<GradeIcon color="warning" />}
            variant="outlined"
            sx={MyMoviesCardChipStyles}
          />
        </CardActions>
      </MyCard>
    );
  }
);

// components:
import {
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
import { MyLabel } from "../MyLabel";
import { LinkButton } from "../LinkButton";
import { colors } from "@mui/material";
// types:
import { T_MY_MOVIE_CARD, E_ROUTES } from "../../types/types";

const MyCard = styled(Card)(({ theme }) => ({
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
  height: "59%",
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

export const MyMovieCard = ({
  id,
  name,
  enName,
  year,
  shortDescription,
  ageRating,
  poster,
  movieLength,
  ratingKp,
  ratingImdb,
  top250,
}: T_MY_MOVIE_CARD) => {
  return (
    <MyCard component={"article"}>
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
          display: 'flex',
          alignItems: 'center',
          color: "white",
          p: '0.25rem'
        }}
      >
        <AccessTimeFilledIcon sx={{mr: '0.5rem'}}/>
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
        {top250 ? `ТОП ${top250}` : null}
      </MyLabel>
      <MyCardMedia
        // image={poster}
        data-src={poster}
        title={enName}
        component="img"
        className="cardImage"
      />
      <CardContent sx={{ padding: "0.5rem" }}>
        <Typography gutterBottom variant="subtitle2" component="h3">
          {name}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "secondary", textAlign: "justify", fontSize: "inherit" }}
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
};

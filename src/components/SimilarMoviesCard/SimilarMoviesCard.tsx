// components:
import { Link } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
// types
import { I_SIMILAR_MOVIES_PROP, E_ROUTES } from "../../types/types";
import "./SimilarMoviesCard.sass";

const SimilarMoviesCardStyles = {
  width: { xs: "150px", md: "165px" },
  height: "200px",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  position: "relative",
  alignItems: "center",
  background: "inherit",
  color: "inherit",
  fontSize: { xs: "14.4px", lg: "1em" },
};

const SimilarMoviesCardMediaStyles = {
  height: "70%",
  objectFit: "cover",
  filter: "grayscale(50%)",
  "&:hover": { filter: "none" },
};

// ! Карточка для  отображения: similarMovies, sequelsAndPrequels
export const SimilarMoviesCard = ({
  id,
  poster,
  name,
  enName,
}: I_SIMILAR_MOVIES_PROP) => {
  return (
    <Link to={`${E_ROUTES.movies}/${id}`}>
      <Card sx={SimilarMoviesCardStyles}>
        <CardMedia
          image={poster.url}
          title={enName}
          component={"img"}
          loading="lazy"
          sx={SimilarMoviesCardMediaStyles}
        />
        <CardContent id="cardContent">
          <Typography gutterBottom sx={{ fontSize: "inherit" }} component="h5">
            {name}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

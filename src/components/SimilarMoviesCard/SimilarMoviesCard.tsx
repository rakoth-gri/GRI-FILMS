// components:
import { Link } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import FAKE from '../../assets/await.jpg'
// types
import { I_SIMILAR_MOVIES_PROP, E_ROUTES } from "../../types/types";
import "./SimilarMoviesCard.sass";

const SimilarMoviesCardStyles = {
  width: { xs: "140px", md: "170px" },
  height: "220px",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  position: "relative",
  alignItems: "center",
  background: "inherit",
  color: "inherit",
  fontSize: { xs: "12px", sm: "14.4px", lg: "15px" },
};

const SimilarMoviesCardMediaStyles = {
  height: "68%",
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
          image={poster?.url || FAKE}
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

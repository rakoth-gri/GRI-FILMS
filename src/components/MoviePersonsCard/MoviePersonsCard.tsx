// components:
import { Link } from "react-router-dom";
import { colors } from "@mui/material";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
// types
import { I_MOVIE_PERSONS_PROP, E_ROUTES } from "../../types/types";
import "./MoviePersonsCard.sass";

const moviePersonsCardStyles = {
  width: "170px",
  height: "230px",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  position: "relative",
  alignItems: "center",
  background: "inherit",
  color: "inherit",
};

const moviePersonsCardMediaStyles = {
  height: "66%",
  width: "80%",
  objectFit: "cover",
  filter: "grayscale(50%)",
  "&:hover": { filter: "none" },
};

const moviePersonsCardULStyles = {
  textAlign: "center",
  letterSpacing: "0.9px",
  fontWeight: 400,
  padding: "0.25rem",
  fontSize: "0.85em",
  width: "100%",
};

const p = {
  fontSize: "0.9em",
  textAlign: "center",
  width: "100%",
  fontWeight: 500,
  mb: "0px",
};

// ! Карточка для  отображения: similarMovies, sequelsAndPrequels
export const MoviePersonsCard = ({
  id,
  photo,
  name,
  enName,
  description,
  profession,
}: I_MOVIE_PERSONS_PROP) => {
  return (
    <Link to={`${E_ROUTES.persons}/${id}`}>
      <Card sx={moviePersonsCardStyles}>
        <CardMedia
          image={photo}
          title={enName}
          component={"img"}
          loading="lazy"
          sx={moviePersonsCardMediaStyles}
        />
        <Typography gutterBottom sx={p} component="p">
          {name}
        </Typography>
        <Box component="ul" sx={moviePersonsCardULStyles}>
          <li> Роль: {description}</li>
          <li> Профессия: {profession}</li>
        </Box>
      </Card>
    </Link>
  );
};

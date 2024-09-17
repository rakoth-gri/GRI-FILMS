// components:
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Box,
  styled,
} from "@mui/material";
import { MyLabel } from "../MyLabel";
import { LinkButton } from "../LinkButton";
import { MyTitle } from "../MyTitle";
import { colors } from "@mui/material";
// types:
import { I_PERSON_SEARCH } from "../../types/types";
import { E_ROUTES } from "../../types/types";
import "./MyPersonCard.sass";

const MyCard = styled(Card)(({ theme }) => ({
  width: "27%",
  height: "415px",
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
    fontSize: "14px",
  },
  [theme.breakpoints.down("sm")]: {
    height: 425,
  },
  [theme.breakpoints.down("xs")]: { width: "85%" },
}));

const MyCardMedia = styled(CardMedia)(() => ({
  height: "55%",
  objectFit: "cover",
  filter: "grayscale(50%)",
  "&:hover": { filter: "none" },
}));

const personCardBoxStyles = {
  textAlign: "justify",
  letterSpacing: "0.8px",
  fontWeight: 400,
  pl: "0.6rem",
  listStyleType: "none",
  fontSize: "inherit",
};

export const MyPersonCard = ({
  id,
  name,
  enName,
  age,
  sex,
  growth,
  birthday,
  death,
  photo,
}: I_PERSON_SEARCH) => {
  return (
    <MyCard component={"article"}>
      <MyLabel
        style={{ top: "2%", right: "2%", backgroundColor: "rgba(0,0,0, .12)" }}
      >
        {" "}
        {age ? age + " лет" : null}
      </MyLabel>
      <MyCardMedia
        className="personImage"
        title={enName}
        data-src={photo}
        component={"img"}
        loading="lazy"
      />
      <CardContent sx={{ padding: "0.25rem" }}>
        <MyTitle
          variant="subtitle1"
          component="h4"
          sx={{ m: "0.25rem" }}
          color="inherit"
        >
          {name}
        </MyTitle>
        <Box component="ul" sx={personCardBoxStyles}>
          <li className="myPersonCard">
            {" "}
            Дата рождения:{" "}
            {birthday && new Date(birthday).toLocaleDateString() + " " + "г."}
          </li>
          <li className="myPersonCard">Пол: {sex}</li>
          <li className="myPersonCard">Рост: {growth} см.</li>
          <li className="myPersonCard">
            {death
              ? `Дата смерти: ${new Date(death).toLocaleDateString()} г.`
              : "Дата смерти: -"}
          </li>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-around", p: "0.35rem" }}>
        <LinkButton id={`${id}`} route={E_ROUTES.persons}>
          {" "}
          подробнее{" "}
        </LinkButton>
      </CardActions>
    </MyCard>
  );
};

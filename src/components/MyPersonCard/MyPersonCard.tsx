import { memo } from "react";
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
    width: "46.5%",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "14px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "85%",
    height: 435,
  },
}));

const MyCardMedia = styled(CardMedia)(() => ({
  height: "55%",
  objectFit: "cover",
  borderRadius: "0.4rem",
  filter: "grayscale(50%)",
  "&:hover": { filter: "none" },
}));

const myPersonCardULStyles = {
  textAlign: "justify",
  letterSpacing: "0.8px",
  fontWeight: 400,
  pl: "0.6rem",
  listStyleType: "none",
  fontSize: "inherit",
  opacity: 0.85,
};

export const MyPersonCard = memo(
  ({
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
      // @ts-ignore
      <MyCard component={"article"}>
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
          {age ? age : null}
        </MyLabel>
        <MyCardMedia
          className="personImage"
          title={enName}
          data-src={photo}
          // @ts-ignore
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
          <Box component="ul" sx={myPersonCardULStyles}>
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
          <LinkButton
            id={`${id}`}
            route={E_ROUTES.persons}
            sx={{ background: "var(--app-card-bg)" }}
          >
            {" "}
            подробнее{" "}
          </LinkButton>
        </CardActions>
      </MyCard>
    );
  }
);

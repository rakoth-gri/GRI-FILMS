// components:
import { Link } from "react-router-dom";
import { Box, Divider } from "@mui/material";
import { MyFlexContainer } from "../MyFlexContainer";
import { MyTitle } from "../MyTitle";
import { Span } from "../Span/Span";
// types:
import { E_ROUTES, I_STUDIO } from "../../types/types";
// utils
import { getBoxStyles } from "../../services/utils";

const MyStudioCardHeaderStyles = {
  ...getBoxStyles({
    display: "flex",
    justify: "space-between",
    direction: "row",
    align: 'center',
    pd: "0px",
    width: "100%",
    mr: '0px',    
    fs: { xs: "13.6px", md: "1.07em" },
    fw: 700,
  }),
  letterSpacing: "0.5px",
  textTransform: "uppercase",
};

export const MyStudioCard = ({
  id,
  movies,
  type,
  subType,
  title,
  createdAt,
}: I_STUDIO) => {
  return (
    <MyFlexContainer
      spacing={0}
      direction="column"
      align={"start"}
      component={"article"}
      mr={{ xs: "0px" }}
    >
      <Box sx={MyStudioCardHeaderStyles}>
        <MyTitle
          component={"h4"}
          variant="subtitle"
          sx={{
            m: "0.5em 0px",
            fontSize: { xs: "15px", md: "1em", textAlign: "left" },
          }}
        >
          {title}
        </MyTitle>
        <time> {createdAt ? new Date(createdAt).toLocaleString() : null} </time>
      </Box>
      <Span style={{margin: '0px'}}>Назначение: {type}</Span>
      <MyFlexContainer
        component={"p"}
        justify="flex-start"
        direction="row"
        spacing={1}
        mr={'0px'}
      >
        Продукты:
        {movies.map((m, i) => (
          <Link to={`${E_ROUTES.movies}/${m}`} key={i}>
            <Span> Картина {i + 1}</Span>
          </Link>
        ))}
      </MyFlexContainer>
      <Divider sx={{ width: "100%" }} />
    </MyFlexContainer>
  );
};

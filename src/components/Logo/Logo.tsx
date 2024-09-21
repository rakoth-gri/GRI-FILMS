// components
import TheatersIcon from "@mui/icons-material/Theaters";
import { Link } from "react-router-dom";
import { IconButton, Tooltip } from "@mui/material";
// types
import { E_ROUTES } from "../../types/types";

export const Logo = () => {
  return (
    <Tooltip title="На главную">
      <Link to={E_ROUTES.home}>
        <IconButton
          sx={{
            p: 0,
            fontSize: "1em",
            color: "inherit",
            fontFamily: "Merienda",
            flexDirection: 'column',
          }}
          edge="start"
        >
          <TheatersIcon
            fontSize="large"
            sx={(theme) => ({
              color: theme.palette.error.dark,
              mb: '0.25rem'
            })}
          />
          GRI-FILMS
        </IconButton>
      </Link>
    </Tooltip>
  );
};

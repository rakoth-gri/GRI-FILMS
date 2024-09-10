import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Tooltip,
  ListItem,
  styled,
} from "@mui/material";
import { NavLink, Link, useLocation } from "react-router-dom";
import TheatersIcon from "@mui/icons-material/Theaters";
import MenuIcon from "@mui/icons-material/Menu";
// consts
import { MAIN_MENU_LIST } from "../../consts/api";
import { MyFlexContainer } from "../MyFlexContainer";
import { E_ROUTES } from "../../types/types";
// css
import "./Header.sass";

const toolBarSx = {
  flexDirection: "row",
  width: "100%",
  justifyContent: "space-between",
  p: "1rem",
};

// @media ----

const down_lg = {
  backgroundColor: "primary.main",
  position: "absolute",
  top: "0%",
  right: "0%",
  flexDirection: "column",
  display: "none",
};

const up_lg = {
  backgroundColor: "inherit",
  position: "static",
  flexDirection: "row",
  display: "flex",
};

const MyNavContainer = styled(MyFlexContainer)(({theme}) => ({
  letterSpacing: "0.7px",
  textTransform: "uppercase",
  [theme.breakpoints.down("lg")]: down_lg,
  [theme.breakpoints.up("lg")]: up_lg,
}));

export function Header() {
  const { pathname } = useLocation();

  return (
    <AppBar position="static">
      <Toolbar sx={toolBarSx}>
        <Tooltip title="На главную">
          <Link to={E_ROUTES.home}>
            <IconButton
              sx={{ p: 0, fontSize: "1em", color: "inherit" }}
              edge="start"
            >
              <TheatersIcon
                fontSize="large"
                sx={(theme) => ({
                  color: theme.palette.error.dark,
                })}
              />
              GRI-FILMS
            </IconButton>
          </Link>
        </Tooltip>
        <MyNavContainer
          component="nav"
          w="auto"
          spacing={2}
          wrap="nowrap"          
        >
          {MAIN_MENU_LIST.map(({ to, text }, i) => (
            <ListItem
              key={i}
              component={"li"}
              sx={{ width: "auto", padding: "0.25rem" }}
            >
              <NavLink to={to} className={pathname === to ? "active" : ""}>
                {text}
              </NavLink>
            </ListItem>
          ))}
        </MyNavContainer>
        <Box sx={{ display: { xs: "flex", lg: "none" }}}>
          <MenuIcon
            fontSize="large"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

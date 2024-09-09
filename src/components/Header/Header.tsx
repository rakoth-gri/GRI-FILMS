import { useState, MouseEvent } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  ListItem,
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

// const styles = (theme) => ({
//   root: {
//     backgroundColor: "inherit",
//     [theme.breakpoints.down("xs")]: {
//       backgroundColor: "green",
//     },
//     [theme.breakpoints.down("md")]: {
//       backgroundColor: "blue",
//     },
//     [theme.breakpoints.down("purple")]: {
//       backgroundColor: "red",
//     },
//   },
// });

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
        <MyFlexContainer
          component="nav"          
          w="auto"
          spacing={2}
          wrap="nowrap"
          sx={{
            letterSpacing: "0.7px",
            textTransform: "uppercase",
            // display: { xs: "none", md: "flex" },
            backgroundColor: { xs: 'primary.main', lg: "inherit" },
            flexDirection: { xs: "column", lg: "row" },
            position: {xs: 'absolute', lg: 'static'},
            top: {xs: '0%'},
            right: {xs: '0%'},
          }}
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
        </MyFlexContainer>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
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

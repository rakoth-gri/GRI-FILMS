import { useState } from "react";
// REDUX:
import { changeThemeParam } from "../../store/themeSlice";
// components
import {
  AppBar,
  Box,
  Toolbar,  
  ListItem,
} from "@mui/material";
import { NavLink, Link, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { Toggler } from "../Toggler";
import { Logo } from "../Logo";
// consts
import { MAIN_MENU_LIST } from "../../consts/api";
import { MyFlexContainer } from "../MyFlexContainer";
// css
import "./Header.sass";

const toolBarStyles = {
  flexDirection: "row",
  width: "100%",
  justifyContent: "space-between",
  p: "1rem",
};


const getMainMenuStyles = (isvisible: boolean) => ({  
  letterSpacing: "0.7px",
  textTransform: "uppercase",
  transform: {
    xs: !isvisible ? "translateY(-100%)" : "translateY(0%)",
    lg: !isvisible && "translateY(0%)",
  },
  transition: "0.3s all ease",
  padding: "0.75rem",
  backgroundColor: "primary.main",
  position: { xs: "absolute", lg: "static" },
  flexDirection: { xs: "column", lg: "row" },
  height: {xs: "200px", lg: "auto" },
  margin: "0px",
  top: "0%",
  right: "0%",
  zIndex: 5,
});

export function Header() {
  const { pathname } = useLocation();

  const [isvisible, setIsVisible] = useState(false);

  return (
    <AppBar position="static">
      <Toolbar sx={toolBarStyles}>
        <Logo/>
        <Toggler
          sx={{fontFamily: 'Merienda'}}
          action={changeThemeParam}
          reducer={"themeSliceReducer"}
          name={"theme"}
        />
        <MyFlexContainer
          sx={getMainMenuStyles(isvisible)}
          component="nav"
          w="auto"
          spacing={2}
          wrap="nowrap"
          onClick={() => setIsVisible((p) => !p)}
        >
          {MAIN_MENU_LIST.map(({ to, text }, i) => (
            <ListItem
              key={i}
              component={"li"}
              sx={{ width: "auto", padding: "0.25rem" }}
            >
              <NavLink
                to={to}                
                className={({ isActive }) =>
                  isActive && pathname === to ? "active" : ""
                }
              >
                {text}
              </NavLink>
            </ListItem>
          ))}
        </MyFlexContainer>
        <Box sx={{ display: { xs: "flex", lg: "none" } }}>
          <MenuIcon
            fontSize="large"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            onClick={() => setIsVisible((p) => !p)}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

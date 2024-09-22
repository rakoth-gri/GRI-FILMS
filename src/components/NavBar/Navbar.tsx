import React from "react";
// components:
import { NavLink, useLocation } from "react-router-dom";
import { ListItem } from "@mui/material";
import { MyFlexContainer } from "../MyFlexContainer";
// consts
import { MAIN_MENU_LIST } from "../../consts/api";

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
  height: { xs: "200px", lg: "auto" },
  margin: "0px",
  top: "0%",
  right: "0%",
  zIndex: 5,
});

interface I_Navbar {
    isvisible: boolean;
    clickHandler: () => void
}

export const Navbar = ({ isvisible, clickHandler }: I_Navbar) => {
  const { pathname } = useLocation();

  return (
    <MyFlexContainer
      sx={getMainMenuStyles(isvisible)}
      component="nav"
      w="auto"
      spacing={2}
      wrap="nowrap"
      onClick={clickHandler}
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
  );
};

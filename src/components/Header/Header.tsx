import { useState } from "react";
// REDUX:
import { changeThemeParam } from "../../store/themeSlice";
// components
import { AppBar, Box, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Toggler } from "../Toggler";
import { Logo } from "../Logo";
import { Navbar } from "../NavBar";
// css
import "./Header.sass";

const headerToolBarStyles = {
  flexDirection: "row",
  width: "100%",
  justifyContent: "space-between",
  p: "1rem",
};

const headerTogglerStyles = {
  fontFamily: "Merienda",
};

export function Header() {
  const [isvisible, setIsVisible] = useState(false);

  return (
    <AppBar position="static">
      <Toolbar sx={headerToolBarStyles}>
        <Logo />
        <Toggler
          sx={headerTogglerStyles}
          action={changeThemeParam}
          reducer={"themeSliceReducer"}
          name="theme"
        />
        <Navbar
          isvisible={isvisible}
          clickHandler={() => setIsVisible((p) => !p)}
        />
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

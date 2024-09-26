import { ChangeEvent, MouseEventHandler, memo } from "react";
// REDUX:
import { useAppSelector, useAppDispatch } from "../../store/store";
// components:
import {
  FormControl,
  FormControlLabel,
  Switch,
  SxProps,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import LightModeIcon from "@mui/icons-material/LightMode";
// types:
import {
  I_MOVIE_STATE,
  I_PERSON_STATE,
  I_REVIEW_STATE,
} from "../../types/types";
import { Theme } from "@mui/material";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
// sass
import "./Toggler.sass"

interface I_Toggler {
  sx?: SxProps<Theme>;
  name:
    | keyof I_MOVIE_STATE
    | keyof I_PERSON_STATE
    | keyof I_REVIEW_STATE
    | keyof { theme: "light" | "dark" };
  reducer: keyof RootState;
  action: ActionCreatorWithPayload<keyof I_PERSON_STATE>;
  onClick?: MouseEventHandler<HTMLElement>;
}

export const Toggler = memo(({ name, reducer, action, onClick, sx }: I_Toggler) => {
  const dispatch = useAppDispatch();

  const label = { inputProps: { "aria-label": "Color switch demo" } };

  // @ts-ignore
  const value = useAppSelector((s) => s[reducer][name]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    dispatch(action(name as keyof I_PERSON_STATE));
  };

  return (
    <FormControl component="fieldset" variant="filled">
      <FormControlLabel
        className="formControlLabel"
        control={
          name === "theme" ? (
            <Switch
              onClick={onClick}
              onChange={handleChange}
              name={name}
              color="default"
              {...label}
              value={value}
              checkedIcon={<Brightness4Icon />}
              icon={<LightModeIcon />}
              edge="start"
              sx={{ fontSize: "inherit" }}
            />
          ) : (
            <Switch
              {...label}
              defaultChecked
              color="default"
              onClick={onClick}
              onChange={handleChange}
              name={name}
              value={value}
              sx={{ fontSize: "inherit" }}
            />
          )
        }
        label={value}
        sx={{
          textTransform: "uppercase",
          letterSpacing: "0.75px",
          fontWeight: "bold",
          fontSize: { xs: "13px", md: "1rem" },
          ...sx,
        }}
      />
    </FormControl>
  );
});

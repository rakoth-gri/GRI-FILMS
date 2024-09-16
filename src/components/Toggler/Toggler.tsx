import { ChangeEvent } from "react";
// REDUX:
import { useAppSelector, useAppDispatch } from "../../store/store";
// components:
import {
  FormLabel,
  FormControl,
  FormControlLabel,
  Switch,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import LightModeIcon from "@mui/icons-material/LightMode";
// types:
import {
  I_MOVIE_STATE,
  I_PERSON_STATE,
  I_REVIEW_STATE,
} from "../../types/types";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

interface I_Toggler {
  name:
    | keyof I_MOVIE_STATE
    | keyof I_PERSON_STATE
    | keyof I_REVIEW_STATE
    | keyof { theme: "light" | "dark" };
  reducer: keyof RootState;
  action: ActionCreatorWithPayload<keyof I_PERSON_STATE>;
  onClick?: (e: any) => void;
}

export const Toggler = ({ name, reducer, action, onClick }: I_Toggler) => {
  const dispatch = useAppDispatch();

  const label = { inputProps: { "aria-label": "Color switch demo" } };

  const value = useAppSelector((s) => s[reducer][name]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    dispatch(action(name as keyof I_PERSON_STATE));
  };

  return (
    <FormControl component="fieldset" variant="filled">
      <FormControlLabel
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
              edge='start'
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
            />
          )
        }
        label={value}
        sx={{
          textTransform: "uppercase",
          letterSpacing: "0.7px",
          fontWeight: "bold",
        }}
      />
    </FormControl>
  );
};

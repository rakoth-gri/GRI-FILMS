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
  title: string;
  name:
    | keyof I_MOVIE_STATE
    | keyof I_PERSON_STATE
    | keyof I_REVIEW_STATE
    | keyof { theme: "light" | "dark" };
  reducer: keyof RootState;
  action: ActionCreatorWithPayload<keyof I_PERSON_STATE>;
}

export const Toggler = ({
  title,
  name,
  reducer,
  action,
  ...props
}: I_Toggler) => {
  const dispatch = useAppDispatch();

  const value = useAppSelector((s) => s[reducer][name]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    dispatch(action(name as keyof I_PERSON_STATE));
  };

  return (
    <FormControl component="fieldset" variant="filled">
      <FormLabel component="legend" sx={{ color: "white" }}>
        {title}
      </FormLabel>
      <FormControlLabel
        control={
          <Switch
            onChange={handleChange}
            name={name}
            {...props}
            color="default"
            value={value}
            checkedIcon={name === "theme" ? <Brightness4Icon /> : null}
            icon={name === "theme" ? <LightModeIcon /> : null}
          />
        }
        label={value}
        sx={{
          textTransform: "uppercase",
          letterSpacing: "0.7px",
          color: "var(--app-default-color)",
          fontWeight: "bold",
        }}
      />
    </FormControl>
  );
};

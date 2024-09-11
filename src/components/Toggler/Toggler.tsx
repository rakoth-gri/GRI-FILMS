import { ChangeEvent } from "react";
// REDUX:
import { useAppSelector, useAppDispatch } from "../../store/store";
// components:
import {
  FormLabel,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Switch,
} from "@mui/material";
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
  name: keyof I_MOVIE_STATE | keyof I_PERSON_STATE | keyof I_REVIEW_STATE;
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
    <FormControl
      component="fieldset"
      variant="filled"
      sx={{ color: "inherit" }}
    >
      <FormLabel component="legend" sx={{ color: "inherit" }}>
        {title}
      </FormLabel>      
      <FormControlLabel
        control={
          <Switch
            onChange={handleChange}
            name={name}
            {...props}
            value={value}
            // checked={value === labels[1] ? true : false}
          />
        }
        label={value}
      />
      <FormHelperText sx={(theme) => ({ color: theme.palette.error.main })}>
        Обязательное поле{" "}
      </FormHelperText>
    </FormControl>
  );
};

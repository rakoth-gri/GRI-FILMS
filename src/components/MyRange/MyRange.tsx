import { ChangeEvent, SelectHTMLAttributes, useState, memo } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
// components
import { Slider, styled, Typography } from "@mui/material";
import { MyTitle } from "../MyTitle";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
// types:
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import {
  T_ACTION_QUERY_PAYLOAD,
  I_MOVIE_STATE,
  I_PERSON_STATE,
  I_REVIEW_STATE,
} from "../../types/types";
import { RootState } from "../../store/store";

const MyRangeTitle = styled(Typography)(({ theme }) => ({
  textAlign: "left",
  fontSize: 'inherit',
  width: "90%",
  mb: "0px",  
  [theme.breakpoints.down('xs')]: {    
    width: '100%',
    fontSize: '0.9rem',  
  }
}));

interface I_MyRange extends SelectHTMLAttributes<HTMLSelectElement> {
  action: ActionCreatorWithPayload<T_ACTION_QUERY_PAYLOAD>;
  reducer: keyof RootState;
  name: keyof I_MOVIE_STATE | keyof I_PERSON_STATE | keyof I_REVIEW_STATE;
  label: string;
  min?: number;
  max?: number;
}

export const MyRange = memo(({
  name,
  action,
  reducer,
  label,
  ...props
}: I_MyRange) => {
  const dispatch = useAppDispatch();

  const value = useAppSelector((s) => s[reducer][name]);

  const changeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    dispatch(action({ name, value }));
  };

  return (
    <>
      <MyRangeTitle
        variant="h5"        
      >
        {label}
      </MyRangeTitle>
      <Slider
        sx={{ width: "90%", color: "inherit", m: "0.25rem", mt: "0px" }}
        name={name}
        shiftStep={1}
        onChange={changeHandler}
        value={value}
        valueLabelDisplay="auto"
        {...props}
      />
    </>
  );
});

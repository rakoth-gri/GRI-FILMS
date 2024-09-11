import React from "react";
import { changeMovieStateSelectFields } from "../../store/movieSlice";
import { useAppDispatch } from "../../store/store";
// components
import { MyFlexContainer } from "../MyFlexContainer";
import { Checkbox } from "@mui/material";
// consts:
import { MOVIE_SELECTFIELDS_FILTER } from "../../consts/api";
import "./MyMovieSelectFieldsFilter.sass"

export const MyMovieSelectFieldsFilter = ({ ...props }) => {
  const dispatch = useAppDispatch();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(changeMovieStateSelectFields(e.target.value));

  return (
    <fieldset className="myMovieSelectFieldsFilter">
      <legend> Выберите поля информации: </legend>
      <MyFlexContainer {...props} style={{ userSelect: "none" }} spacing={1}>
        {MOVIE_SELECTFIELDS_FILTER.map(({ value, text }) => (
          <label
            key={value}
            style={{ letterSpacing: "0.5px" }}
          >
            <Checkbox
              name={'selectFields'}
              value={value}
              color={"success"}
              onChange={changeHandler}
            />
            {text}
          </label>
        ))}
      </MyFlexContainer>
    </fieldset>
  );
};

import React from "react";
import { changeMovieStateSelectFields } from "../../store/movieSlice";
import { useAppDispatch } from "../../store/store";
// components
import { MyFlexContainer } from "../MyFlexContainer";
import { Checkbox } from "@mui/material";
// types
import { T_SORTFIELD_SELECT } from "../../types/types";
import "./MyMovieSelectFieldsFilter.sass"

const MOVIE_SELECTFIELDS_FILTER: T_SORTFIELD_SELECT<string>[] = [
  {
    value: "slogan",
    text: "Слоган",
  },
  {
    value: "releaseYears",
    text: "Год релиза",
  },
  {
    value: "votes",
    text: "Количество голосов",
  },
  {
    value: "budget",
    text: "Бюджет",
  },
  {
    value: "videos",
    text: "Трейлеры",
  },
  {
    value: "persons",
    text: "Команда",
  },

  {
    value: "facts",
    text: "Факты",
  },
  {
    value: "fees",
    text: "Сборы",
  },
  {
    value: "premiere",
    text: "Дата премьеры",
  },
  {
    value: "similarMovies",
    text: "Схожие картины",
  },
  {
    value: "sequelsAndPrequels",
    text: "Сиквелы и приквелы",
  },
  {
    value: "top250",
    text: "ТОП 250",
  },
];

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

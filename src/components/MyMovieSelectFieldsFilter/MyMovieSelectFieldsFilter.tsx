import React from "react";
import { changeMovieStateSelectFields } from "../../store/movieSlice";
import { useAppDispatch } from "../../store/store";
// components
import { MyFlexContainer } from "../MyFlexContainer";
import { Checkbox, Box } from "@mui/material";
// consts:
import { MOVIE_SELECTFIELDS_FILTER } from "../../consts/api";

const MyMovieSelectFieldsFilterStyles = {
  padding: "0.5rem",
  backgroundColor: "inherit",
  fontFamily: "Montserrat",
  color: "inherit",
  border: "1px solid",
  width: { xs: "100%", md: "90%" },
  fontSize: { xs: "0.8em", sm: "0.9em", md: "1rem" },
};

export const MyMovieSelectFieldsFilter = ({ ...props }) => {
  const dispatch = useAppDispatch();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(changeMovieStateSelectFields(e.target.value));

  return (
    <Box component={"fieldset"} sx={MyMovieSelectFieldsFilterStyles}>
      <legend> Выберите поля информации: </legend>
      <MyFlexContainer
        {...props}
        sx={{ userSelect: "none", m: "0px" }}
        spacing={1}
      >
        {MOVIE_SELECTFIELDS_FILTER.map(({ value, text }) => (
          <label key={value} style={{ letterSpacing: "0.5px" }}>
            <Checkbox
              name={"selectFields"}
              value={value}
              color={"success"}
              onChange={changeHandler}
            />
            {text}
          </label>
        ))}
      </MyFlexContainer>
    </Box>
  );
};

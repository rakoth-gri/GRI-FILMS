import { memo, MouseEventHandler } from "react";
import { changeMovieStateSelectFields } from "../../store/movieSlice";
import { useAppDispatch } from "../../store/store";
// components
import { MyFlexContainer } from "../MyFlexContainer";
import { Checkbox, Box, SxProps, Theme } from "@mui/material";
// consts:
import { MOVIE_SELECTFIELDS_FILTER } from "../../consts/api";

const MyMovieSelectFieldsFilterStyles = {
  padding: "0.5rem",
  backgroundColor: "inherit",
  fontFamily: "Montserrat",
  color: "inherit",
  width: { xs: "100%", md: "90%" },
  fontSize: { xs: "0.8em", sm: "0.9em", md: "1rem" },
};

interface I_MyMovieSelectFieldsFilter {
  spacing?: number;
  justify?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | Record<string, unknown>;
  direction?:
    | "row"
    | "column"
    | "row-reverse"
    | "column-reverse"
    | Record<string, unknown>;
  align?: "center" | "stretch" | "start" | "end" | Record<string, unknown>;
  sx?: SxProps<Theme>;
  onClick?: MouseEventHandler<HTMLElement>
}

export const MyMovieSelectFieldsFilter = memo(
  (props: I_MyMovieSelectFieldsFilter) => {
    const dispatch = useAppDispatch();

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch(changeMovieStateSelectFields(e.target.value));

    return (
      <Box component={"fieldset"} sx={MyMovieSelectFieldsFilterStyles}>
        <legend style={{ padding: "0px 0.75rem" }}>
          {" "}
          Выберите поля информации:{" "}
        </legend>
        <MyFlexContainer {...props} sx={{ userSelect: "none", m: "0px" }}>
          {MOVIE_SELECTFIELDS_FILTER.map(({ value, text }) => (
            <label key={value} style={{ letterSpacing: "0.5px" }}>
              <Checkbox
                name={"selectFields"}
                value={value}
                color="default"
                onChange={changeHandler}
              />
              {text}
            </label>
          ))}
        </MyFlexContainer>
      </Box>
    );
  }
);

import { MouseEventHandler, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
// createAsyncThunks
// action Creators
import { changeMovieStateQueryParams } from "../../store/movieSlice";
// components:
import { MyPagination } from "../../components/MyPagination";
import { MyTitle } from "../../components/MyTitle";
import { MyMovieCard } from "../../components/MyMovieCard";
import { MyFlexContainer } from "../../components/MyFlexContainer";
import { Render } from "../../components/Render";
// consts
import {
  END_POINTS,
  SORTTYPE_SELECT_LIST,
  MOVIE_SORTFIELD_SELECT_LIST,
  GENRES_SELECT_LIST,
  MOVIE_TYPES_SELECT_LIST,
  LIMIT_PARAM_SELECT_LIST,
  COUNTRIES_SELECT_LIST,
} from "../../consts/api";
// types:
import { RootState } from "../../store/store";

export const FavoriteMoviesPage = () => {
  const dispatch = useAppDispatch();

  const favorites = useAppSelector((s: RootState) => s.movieSliceReducer.favorites);

  return (
    <>
      <MyTitle
        align="center"
        component="h1"
        variant="h4"
        sx={{
          color: "var(--app-default-color)",
          fontSize: { xs: "1.3rem", md: "2rem" },
        }}
      >
        избранные кинокартины:
      </MyTitle>
      <MyFlexContainer
        spacing={2}
        sx={{ minHeight: "45vh", margin: { xs: "0px" } }}
      >
        <Render
          list={favorites}
          loading={false}
          error={''}
          cb={(item: any) => <MyMovieCard key={item.id} {...item} />}
        />
      </MyFlexContainer>
      <MyPagination
        action={changeMovieStateQueryParams}
        reducer="movieSliceReducer"
      />
    </>
  );
};

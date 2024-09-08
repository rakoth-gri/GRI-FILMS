import { Fragment, MouseEventHandler, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
// createAsyncThunks
import { movieThunk, movieSearchThunk } from "../../store/movieThunks";
// action Creators
import { changeMovieStateQueryParams } from "../../store/movieSlice";
// components:
import { Button } from "@mui/material";
import { MyFilterTrigger } from "../../components/MyFilterTrigger";
import { MySelect } from "../../components/MySelect";
import { MyRange } from "../../components/MyRange";
import { MySortType } from "../../components/MySortType";
import { MySearch } from "../../components/MySearch";
import { MyPagination } from "../../components/MyPagination";
import { MyTitle } from "../../components/MyTitle";
import { MyLoader } from "../../components/MyLoader";
import { MyMovieCard } from "../../components/MyMovieCard";
import { MyFlexContainer } from "../../components/MyFlexContainer";
import { Render } from "../../components/Render";
import { MyMovieSelectFieldsFilter } from "../../components/MyMovieSelectFieldsFilter";
import { MyFilterWrapper } from "../../components/MyFilterWrapper";
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

export const MoviesPage = () => {
  const dispatch = useAppDispatch();

  const [isOpenFilter, setIsOpenFilter] = useState(false);

  const { query, page, loading, movies, error } = useAppSelector(
    (s: RootState) => s.movieSliceReducer
  );

  useEffect(() => {
    if (!query)
      dispatch(movieThunk({ url: END_POINTS.movie, method: "movie" }));
  }, [page, query]);

  useEffect(() => {
    if (query)
      dispatch(
        movieSearchThunk({ url: END_POINTS.movieSearch, method: "movieSearch" })
      );
  }, [page, query]);

  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    dispatch(movieThunk({ url: END_POINTS.movie, method: "movie" }));
  };

  return (
    <Fragment>
      <MyTitle
        align="center"
        color="primary"
        component="h1"
        variant="h4"
        sx={{ textTransform: "capitalize" }}
      >
        {" "}
        Кинокартины:{" "}
      </MyTitle>
      <MyFilterTrigger onClick={() => setIsOpenFilter((p) => !p)} />
      <MyLoader color="info" variant="query" loading={loading} />
      <MySearch
        action={changeMovieStateQueryParams}
        reducer="movieSliceReducer"
        placeholder="Введите название фильма:"
        // autoFocus
      />
      <MyFilterWrapper
        onClick={() => setIsOpenFilter((prev) => !prev)}
        isOpenFilter={isOpenFilter}
      >
        <MySelect
          list={MOVIE_SORTFIELD_SELECT_LIST}
          name={"sortField"}
          action={changeMovieStateQueryParams}
          reducer={"movieSliceReducer"}
          onClick={(e) => e.stopPropagation()}
        />
        <MySelect
          list={GENRES_SELECT_LIST}
          name={"genre"}
          action={changeMovieStateQueryParams}
          reducer={"movieSliceReducer"}
          onClick={(e) => e.stopPropagation()}
        />
        <MySelect
          list={MOVIE_TYPES_SELECT_LIST}
          name={"type"}
          action={changeMovieStateQueryParams}
          reducer={"movieSliceReducer"}
          onClick={(e) => e.stopPropagation()}
        />
        <MySelect
          list={LIMIT_PARAM_SELECT_LIST}
          name={"limit"}
          action={changeMovieStateQueryParams}
          reducer={"movieSliceReducer"}
          onClick={(e) => e.stopPropagation()}
        />
        <MySortType
          list={SORTTYPE_SELECT_LIST}
          name={"sortType"}
          reducer="movieSliceReducer"
          action={changeMovieStateQueryParams}
          onClick={(e) => e.stopPropagation()}
        />
        <MySelect
          list={COUNTRIES_SELECT_LIST}
          name={"countries"}
          action={changeMovieStateQueryParams}
          reducer={"movieSliceReducer"}
          onClick={(e) => e.stopPropagation()}
        />
        <MyRange
          label={"Рейтинг Кинопоиска"}
          name={"ratingKp"}
          action={changeMovieStateQueryParams}
          reducer={"movieSliceReducer"}
          onClick={(e) => e.stopPropagation()}
        />
        {/* <MyRange
          label={'Рейтинг IMDB'}
          name={"ratingIMDB"}
          action={changeMovieStateQueryParams}
          reducer={"movieSliceReducer"}
          onClick={(e) => e.stopPropagation()}
        /> */}
        <MyMovieSelectFieldsFilter
          color={"success"}
          spacing={2}
          justify="space-evenly"
          direction="column"
          align="start"
          onClick={(e: any) => e.stopPropagation()}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: "0.5rem", width: "90%" }}
          onClick={clickHandler}
        >
          {" "}
          начать поиск{" "}
        </Button>
      </MyFilterWrapper>
      <MyFlexContainer spacing={4} sx={{ minHeight: "45vh" }}>
        <Render
          list={movies}
          loading={loading}
          error={error}
          cb={(item: any) => <MyMovieCard key={item.id} {...item} />}
        />
      </MyFlexContainer>
      <MyPagination
        action={changeMovieStateQueryParams}
        reducer="movieSliceReducer"
      />
    </Fragment>
  );
};

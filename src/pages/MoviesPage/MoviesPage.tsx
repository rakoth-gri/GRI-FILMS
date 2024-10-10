import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
// createAsyncThunks
import { movieThunk, movieSearchThunk } from "../../store/movieThunks";
// action Creators
import { changeMovieStateQueryParams } from "../../store/movieSlice";
// components:
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
import Render from "../../components/Render";
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
import { I_MOVIE, T_MOVIE_SEARCH } from "../../types/types";
// utils
import { observerCB, options, toTheTop } from "../../services/utils";

const renderCallback = (item: I_MOVIE) => (
  <MyMovieCard key={item.id} {...item} />
);

const moviesPageTitleStyles = {
  color: "var(--app-default-color)",
  fontSize: { xs: "1.3rem", md: "2rem" },
};

export const MoviesPage = () => {
  const dispatch = useAppDispatch();

  const [isOpenFilter, setIsOpenFilter] = useState(false);

  // const { query, page, loading, movies, error } = useAppSelector(
  //   (s: RootState) => s.movieSliceReducer
  // );
  const query = useAppSelector((s: RootState) => s.movieSliceReducer.query);
  const page = useAppSelector((s: RootState) => s.movieSliceReducer.page);
  const loading = useAppSelector((s: RootState) => s.movieSliceReducer.loading);
  const movies = useAppSelector((s: RootState) => s.movieSliceReducer.movies);
  const error = useAppSelector((s: RootState) => s.movieSliceReducer.error);

  const MyObserver = useMemo(
    () => new IntersectionObserver(observerCB, options),
    []
  );

  useEffect(() => {
    if (query)
      dispatch(
        movieSearchThunk({ url: END_POINTS.movieSearch, method: "movieSearch" })
      );
    else dispatch(movieThunk({ url: END_POINTS.movie, method: "movie" }));
  }, [page, query]);

  useEffect(() => {
    if (movies.length)
      document
        .querySelectorAll(".cardImage")
        .forEach((image) => MyObserver.observe(image));
    toTheTop();
  }, [movies]);

  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    dispatch(movieThunk({ url: END_POINTS.movie, method: "movie" }));
  };

  const stopPropagation: MouseEventHandler<HTMLElement> = useCallback(
    (e) => e.stopPropagation(),
    []
  );

  return (
    <>
      <MyTitle
        align="center"
        component="h1"
        variant="h4"
        sx={moviesPageTitleStyles}
      >
        кинокартины:
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
        sx={{ m: "0px", p: "1rem" }}
        action={clickHandler}
      >
        <MySelect
          list={MOVIE_SORTFIELD_SELECT_LIST}
          name={"sortField"}
          action={changeMovieStateQueryParams}
          reducer={"movieSliceReducer"}
          onClick={stopPropagation}
        />
        <MySelect
          list={GENRES_SELECT_LIST}
          name={"genre"}
          action={changeMovieStateQueryParams}
          reducer={"movieSliceReducer"}
          onClick={stopPropagation}
        />
        <MySelect
          list={MOVIE_TYPES_SELECT_LIST}
          name={"type"}
          action={changeMovieStateQueryParams}
          reducer={"movieSliceReducer"}
          onClick={stopPropagation}
        />
        <MySelect
          list={LIMIT_PARAM_SELECT_LIST}
          name={"limit"}
          action={changeMovieStateQueryParams}
          reducer={"movieSliceReducer"}
          onClick={stopPropagation}
        />
        <MySelect
          list={COUNTRIES_SELECT_LIST}
          name={"countries"}
          action={changeMovieStateQueryParams}
          reducer={"movieSliceReducer"}
          onClick={stopPropagation}
        />
        <MyRange
          label={"Рейтинг Кинопоиска"}
          name={"ratingKp"}
          action={changeMovieStateQueryParams}
          reducer={"movieSliceReducer"}
          onClick={stopPropagation}
        />
        <MyRange
          label={"Рейтинг IMDB"}
          name={"ratingIMDB"}
          action={changeMovieStateQueryParams}
          reducer={"movieSliceReducer"}
          onClick={stopPropagation}
        />
        <MyRange
          label={"Год выпуска"}
          name={"year"}
          action={changeMovieStateQueryParams}
          reducer={"movieSliceReducer"}
          onClick={stopPropagation}
          min={1908}
          max={2034}
        />
        <MySortType
          list={SORTTYPE_SELECT_LIST}
          name={"sortType"}
          reducer="movieSliceReducer"
          action={changeMovieStateQueryParams}
          onClick={stopPropagation}
        />
        <MyMovieSelectFieldsFilter
          spacing={1}
          justify="space-evenly"
          direction="column"
          align="start"
          onClick={stopPropagation}
        />
      </MyFilterWrapper>
      <MyFlexContainer
        spacing={2}
        sx={{ minHeight: "45vh", margin: { xs: "0px" } }}
      >
        <Render
          list={movies}
          loading={loading}
          error={error}
          // @ts-ignore
          cb={renderCallback}
        />
      </MyFlexContainer>
      <MyPagination
        page={page}
        action={changeMovieStateQueryParams}
        reducer="movieSliceReducer"
      />
    </>
  );
};

import { Fragment, useState, useEffect, MouseEvent } from "react";
// RTK-QUERY
import { useGetTop250MoviesQuery } from "../../store/rtk_query";
// components
import { IconButton } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { MyTitle } from "../../components/MyTitle";
import { MyLoader } from "../../components/MyLoader";
import { MyFlexContainer } from "../../components/MyFlexContainer";
import { MyPagination } from "../../components/MyPagination";
import { MyMovieCard } from "../../components/MyMovieCard";
import { MyError } from "../../components/MyError/MyError";
// consts
import { END_POINTS, MOVIE_SELECTFIELDS_LIST } from "../../consts/api";
// types
import { I_API_OBJECT, I_MOVIE } from "../../types/types";

export const Top250Page = () => {
  const [state, setState] = useState({
    page: 1,
    total: 0,
    pages: 0,
  });

  const {
    data: movies,
    error,
    isLoading,
  } = useGetTop250MoviesQuery({
    endPoint: END_POINTS.movie,
    selectFieldList: MOVIE_SELECTFIELDS_LIST,
    method: "top250",
    page: state.page,
  });

  useEffect(() => {
    if (movies) {
      setState((p) => ({ ...p, pages: movies.pages, total: movies.total }));
    }
  }, [movies]);

  const clickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    // if(!(e.target instanceof HTMLElement)) return

    if (e.target.closest("#next")) {
      return setState({ ...state, page: state.page + 1 });
    } else if (e.target.closest("#prev")) {
      return setState({ ...state, page: state.page - 1 });
    }
    setState({ ...state, page: 1 });
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
        ТОП 250 в истории:{" "}
      </MyTitle>
      <MyLoader color="info" variant="query" loading={isLoading} />
      <MyFlexContainer spacing={4} sx={{ minHeight: "45vh" }}>
        {movies && !error ? (
          <>
            {(movies as I_API_OBJECT<I_MOVIE>).data.map((movie) => (
              <MyMovieCard key={movie.id} {...movie} />
            ))}
          </>
        ) : (
          <MyError> {error} </MyError>
        )}
      </MyFlexContainer>
      <MyFlexContainer w="100%">
        <IconButton
          aria-label="prev"
          onClick={clickHandler}
          size="large"
          disabled={state.page === 1}
          id="prev"
        >
          <NavigateBeforeIcon />
        </IconButton>
        <IconButton onClick={clickHandler} size="large">
          {state.page}
        </IconButton>
        <IconButton
          aria-label="next"
          id="next"
          onClick={clickHandler}
          size="large"
          disabled={state.page === state.pages}
        >
          <NavigateNextIcon />
        </IconButton>
      </MyFlexContainer>
    </Fragment>
  );
};

import { Fragment, useState, useEffect, MouseEvent, useRef } from "react";
// RTK-QUERY
import { useGetTop250MoviesQuery } from "../../store/rtk_query";
// components
import { SimplePagination } from "../../components/SimplePagination";
import { MyTitle } from "../../components/MyTitle";
import { MyLoader } from "../../components/MyLoader";
import { MyFlexContainer } from "../../components/MyFlexContainer";
import { MyMovieCard } from "../../components/MyMovieCard";
import { MyError } from "../../components/MyError/MyError";
// consts
import { END_POINTS, MOVIE_SELECTFIELDS_LIST } from "../../consts/api";
// types
import { I_API_OBJECT, I_MOVIE } from "../../types/types";
// utils
import { observerCB, options } from "../../services/utils";

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

  const ref = useRef<IntersectionObserver | null>(null);
  ref.current = new IntersectionObserver(observerCB, options);

  useEffect(() => {
    if (movies) {
      setState((p) => ({ ...p, pages: movies.pages, total: movies.total }));
    }
  }, [movies]);

  useEffect(() => {
    let cardImages = document.querySelectorAll(".cardImage");
    if (cardImages.length)
      cardImages.forEach((cardImage) =>
        (ref.current as IntersectionObserver).observe(cardImage)
      );
  }, [movies]);

  const clickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    if ((e.target as HTMLButtonElement).closest("#next")) {
      return setState({ ...state, page: state.page + 1 });
    } else if ((e.target as HTMLButtonElement).closest("#prev")) {
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
        Топ 250 по версии Кинопоиска:{" "}
      </MyTitle>
      <MyLoader color="info" variant="query" loading={isLoading} />
      <MyFlexContainer spacing={4} sx={{ minHeight: "45vh" }}>
        {movies && !error ? (
          <>
            {(movies as I_API_OBJECT<I_MOVIE[]>).data.map((movie) => (
              <MyMovieCard key={movie.id} {...movie} />
            ))}
          </>
        ) : (
          <MyError> {error as string} </MyError>
        )}
      </MyFlexContainer>
      <SimplePagination
        page={state.page}
        pages={state.pages}
        clickHandler={clickHandler}
      />
    </Fragment>
  );
};

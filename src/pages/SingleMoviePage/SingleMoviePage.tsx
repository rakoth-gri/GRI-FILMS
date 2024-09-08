import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// createAsyncThunks
import { movieByIdThunk } from "../../store/movieThunks";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { cleanUpSingleMovieInfo } from "../../store/movieSlice";
// components
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { MyTitle } from "../../components/MyTitle";
import { MyLoader } from "../../components/MyLoader";
import { MyTrailer } from "../../components/MyTrailer";
import { ContainerForLists } from "../../components/ContainerForLists";
import { SimilarMoviesCard } from "../../components/SimilarMoviesCard";
import { MoviePersonsCard } from "../../components/MoviePersonsCard";
import { LinkButton } from "../../components/LinkButton";
import { Box, Button } from "@mui/material";
// consts
import { END_POINTS } from "../../consts/api";
// types
import { RootState } from "../../store/store";
import {
  I_MOVIE,
  I_SIMILAR_MOVIES_PROP,
  I_MOVIE_PERSONS_PROP,
  E_ROUTES,
} from "../../types/types";

const trailerTrigger = {
  position: "absolute",
  top: "-1%",
  right: "0%",
  textTransform: "uppercase",
  letterSpacing: '0.7px'
};

export const SingleMoviePage = () => {
  const dispatch = useAppDispatch();
  const [isTrailerModal, setIsTrailerModal] = useState(false);
  const { movie, loading } = useAppSelector(
    (s: RootState) => s.movieSliceReducer
  );
  const { movieId } = useParams();

  useEffect(() => {
    movieId &&
      dispatch(
        movieByIdThunk({
          url: `${END_POINTS.movie}/${movieId}`,
          id: 0,
          method: "movieById",
        })
      );
  }, [movieId]);

  useEffect(() => {
    return () => {
      dispatch(cleanUpSingleMovieInfo());
    };
  }, []);

  return (
    <Fragment>
      <MyTitle align="center" color="primary" component="h1" variant="h4">
        {(movie as I_MOVIE)?.name}
      </MyTitle>
      {loading && <MyLoader loading={loading} />}
      {!!Object.keys(movie as I_MOVIE).length && (
        <>
          <Box component={"section"} sx={{ padding: "0.5rem" }}>
            <MyTitle
              align="center"
              component="h3"
              variant="h6"
              color={"inherit"}
            >
              Вам также могут понравяться:
            </MyTitle>
            <ContainerForLists
              list={(movie as I_MOVIE).sequelsAndPrequels}
              cb={(movie: I_SIMILAR_MOVIES_PROP) => (
                <SimilarMoviesCard key={movie.id} {...movie} />
              )}
            />
          </Box>
          <Box component={"section"} sx={{ padding: "0.5rem" }}>
            <MyTitle
              align="center"
              component="h3"
              variant="h6"
              color={"inherit"}
            >
              Актеры и создатели картины:
            </MyTitle>
            <ContainerForLists
              list={(movie as I_MOVIE).persons}
              cb={(movie: I_MOVIE_PERSONS_PROP, i?: number) => (
                <MoviePersonsCard key={i} {...movie} />
              )}
            />
          </Box>
        </>
      )}
      <MyTitle
        color="primary"
        component="h3"
        variant="subtitle"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        Постеры и изображения:{" "}
        <LinkButton
          route={E_ROUTES.images}
          id={movieId}
          variant="text"
          sx={{
            letterSpacing: "0.8px",
            fontFamily: "Montserrat",
            textTransform: "none",
            fontSize: "1.02em",
            color: "purple",
          }}
        >
          {" "}
          смотреть...{" "}
        </LinkButton>
      </MyTitle>
      <Button startIcon={<PlayCircleFilledIcon/>} onClick={() => setIsTrailerModal(true)} sx={trailerTrigger} variant={'contained'} color='success'>
        {" "}
        TRAILER{" "}
      </Button>
      {isTrailerModal && (
        <MyTrailer
          url={(movie as I_MOVIE)?.videos?.url}
          name={(movie as I_MOVIE)?.videos?.name}
          sx={{ background: "rgba(0,0,0, .85)" }}
          onClick={() => setIsTrailerModal((p) => !p)}
        />
      )}
    </Fragment>
  );
};

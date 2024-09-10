import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// createAsyncThunks
import { movieByIdThunk } from "../../store/movieThunks";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { cleanUpSingleMovieInfo } from "../../store/movieSlice";
// components:
import {
  Box,
  Button,
  CardMedia,
  styled,
  Typography,
  Divider,
} from "@mui/material";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import { Link } from "react-router-dom";
import { MyTitle } from "../../components/MyTitle";
import { MyLoader } from "../../components/MyLoader";
import { MyTrailer } from "../../components/MyTrailer";
import { MoviePersonsCard } from "../../components/MoviePersonsCard";
import { ContainerForLists } from "../../components/ContainerForLists";
import { SimilarMoviesCard } from "../../components/SimilarMoviesCard";
import { LinkButton } from "../../components/LinkButton";
import { SingleMoviePropsList } from "../../components/SingleMoviePropsList";
import { MyLabel } from "../../components/MyLabel";
// consts
import { END_POINTS } from "../../consts/api";
// types
import { RootState } from "../../store/store";
import { I_MOVIE, I_SIMILAR_MOVIES_PROP, E_ROUTES } from "../../types/types";
import { MyFlexContainer } from "../../components/MyFlexContainer";
import "./SingleMoviePage.sass";
// utils:
import { movieLengthFormat } from "../../services/utils";

const MyTrailerTrigger = styled(Button)(({ theme }) => ({
  textTransform: "uppercase",
  letterSpacing: "0.7px",
  backgroundColor: theme.palette.warning.main,
  borderRadius: "12px",
  color: "white",
}));

const getBoxStyles = ({
  width = "100%",
  height = "auto",
  display = "block",
  justify = "center",
  align = "start",
  direction = "column",
  pd = "0.5rem",
  mr = "0.5rem",
  wrap = "wrap",
  fw = 400,
  fs = "inherit",
  ta = "left",
}) => ({
  width,
  height,
  display,
  justifyContent: justify,
  alignItems: align,
  flexDirection: direction,
  position: "relative",
  padding: pd,
  margin: mr,
  background: "inherit",
  color: "inherit",
  flexWrap: wrap,
  fontWeight: fw,
  fontSize: fs,
  textAlign: ta,
});

const cardMediaStyles = {
  width: "100%",
  objectFit: "cover",
  filter: "grayscale(50%)",
  "&:hover": { filter: "none" },
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
  }, []);

  useEffect(() => {
    return () => {
      dispatch(cleanUpSingleMovieInfo());
    };
  }, []);

  if (!Object.keys(movie).length) return <MyLoader loading={loading} />;

  const {
    id,
    name,
    enName,
    year,
    type,
    description,
    videos,
    slogan,
    ratingKp,
    ratingImdb,
    ageRating,
    votesKp,
    votesImdb,
    movieLength,
    genres,
    countries,
    persons,
    premiereRussia,
    premiereWorld,
    poster,
    sequelsAndPrequels,
    budget,
    similarMovies,
    feesRussia,
    feesWorld,
    top250,
  } = movie as I_MOVIE;

  return (
    <>
      <MyFlexContainer align="start" id={`${id}`} spacing={1}>
        <Box sx={getBoxStyles({ width: "24%", height: "400px" })}>
          <CardMedia
            component={"img"}
            src={poster}
            title={enName}
            sx={cardMediaStyles}
          />
          <MyLabel sx={{ top: "3%", left: "4%" }}> ТОП {top250} </MyLabel>
        </Box>
        <Box
          sx={getBoxStyles({
            width: "47%",
            display: "flex",
            justify: "flex-start",
            align: "start",
          })}
        >
          <MyTitle align="left" color="inherit" component="h1" variant="h4">
            {name} ({year})
          </MyTitle>
          <Box
            sx={{
              ...getBoxStyles({ fw: 700, ta: "left" }),
              opacity: "0.84",
            }}
          >
            {" "}
            Рейтинг: {ratingKp}{" "}
          </Box>
          <MyTrailerTrigger
            startIcon={<PlayCircleFilledIcon />}
            onClick={() => setIsTrailerModal(true)}
            variant={"contained"}
          >
            См. Трейлер
          </MyTrailerTrigger>
          <MyTitle variant="h5" component={"h3"} align="left" color="inherit">
            {" "}
            О Фильме:{" "}
          </MyTitle>
          <Box
            sx={getBoxStyles({
              display: "flex",
              direction: "row",
              justify: "flex-start",
            })}
          >
            <Box
              sx={{
                ...getBoxStyles({
                  display: "flex",
                  width: "30%",
                  fs: "0.85em",
                  ta: "left",
                }),
                opacity: 0.84,
              }}
            >
              <span className="title">Год производства</span>
              <span className="title"> Страна</span>
              <span className="title"> Жанр </span>
              <span className="title"> Слоган</span>
              <span className="title">Сборы в России</span>
              <span className="title">Сборы в Мире</span>
              <span className="title">Премьера в России</span>
              <span className="title">Премьера в Мире</span>
              <span className="title">Продолжительность </span>
              <span className="title">Возраст </span>
              <span className="title">Рейтинг IMDB </span>
              <span className="title">Бюджет </span>
              <span className="title">Тип картины </span>
            </Box>
            <Box
              sx={getBoxStyles({
                display: "flex",
                width: "62%",
                fs: "0.85em",
                ta: "left",
                fw: 500,
              })}
            >
              <span className="desc">{year}</span>
              <span className="desc"> {countries.join(", ")}</span>
              <span className="desc"> {genres.join(", ")}</span>
              <span className="desc">
                {" "}
                <q>{slogan}</q>{" "}
              </span>
              <span className="desc"> {feesRussia} </span>
              <span className="desc"> {feesWorld}</span>
              <span className="desc">
                {premiereRussia
                  ? new Date(premiereRussia).toLocaleDateString() + " г."
                  : "-"}
              </span>
              <span className="desc">
                {premiereWorld
                  ? new Date(premiereWorld).toLocaleDateString() + " г."
                  : "-"}
              </span>
              <span className="desc"> {movieLengthFormat(movieLength)}</span>
              <span className="ageRating"> {ageRating}+ </span>
              <span className="title"> {ratingImdb} </span>
              <span className="title"> {budget} </span>
              <span className="title"> {type} </span>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            ...getBoxStyles({
              width: "24%",
              fs: "0.9em",
              fw: 700,
              pd: "0.5rem",
              display: "flex",
              align: "center",
            }),
            opacity: "0.84",
          }}
        >
          <span className="title"> {ratingKp} </span>
          <span className="title"> KP: {votesKp} оценок </span>
          <span className="title"> IMDB: {votesImdb} оценок </span>
          <Box
            sx={getBoxStyles({
              fw: 400,
              pd: "0.25rem",
              display: "flex",
              align: "center",
              fs: "0.95em",
            })}
          >
            <MyTitle variant="subtitle" component="h4" color="inherit">
              В главных ролях:
            </MyTitle>
            <>
              {persons.slice(0, 8).map((p, i) => (
                <Link to={`${E_ROUTES.persons}/${p.id}`} key={p.id}>
                  <span className="actors"> {p.name} </span>
                </Link>
              ))}
            </>
          </Box>
        </Box>
      </MyFlexContainer>
      <Divider />
      <MyFlexContainer justify="flex-start">
        <LinkButton
          route={E_ROUTES.images}
          id={movieId}
          variant="outlined"
          sx={{
            letterSpacing: "0.8px",
            fontFamily: "Montserrat",
            textTransform: "none",
            fontSize: "1.02em",
            color: "purple",
          }}
        >
          {" "}
          Изображения{" "}
        </LinkButton>
        <Button
          variant="outlined"
          sx={{
            letterSpacing: "0.8px",
            fontFamily: "Montserrat",
            textTransform: "none",
            fontSize: "1.02em",
            color: "purple",
          }}
          onClick={() => setIsTrailerModal(true)}
        >
          {" "}
          См. Трейлер{" "}
        </Button>
      </MyFlexContainer>
      <Box sx={getBoxStyles({ mr: "0.5rem" })}>
        <MyTitle variant="h5" component={"h3"} align="left" color="inherit">
          Сюжет:
        </MyTitle>
        <Typography
          component={"p"}
          color={"inherit"}
          sx={{
            letterSpacing: "0.7px",
            textAlign: "justify",
            lineHeight: "1.45em",
          }}
        >
          {description}
        </Typography>
      </Box>
      <Divider />
      <SingleMoviePropsList
        list={similarMovies}
        title={"Вам также могут понравяться:"}
        cb={(movie: I_SIMILAR_MOVIES_PROP) => (
          <SimilarMoviesCard key={movie.id} {...movie} />
        )}
      />
      <Divider />
      <SingleMoviePropsList
        list={sequelsAndPrequels}
        title={"Сиквелы и Приквелы:"}
        cb={(movie: I_SIMILAR_MOVIES_PROP) => (
          <SimilarMoviesCard key={movie.id} {...movie} />
        )}
      />
      <Divider />
      <SingleMoviePropsList
        list={persons}
        title={"Актеры и Создатели:"}
        cb={(item: any, i?: number) => <MoviePersonsCard key={i} {...item} />}
      />
      {isTrailerModal && (
        <MyTrailer
          url={videos?.url}
          name={videos?.name}
          sx={{ background: "rgba(0,0,0, .85)" }}
          onClick={() => setIsTrailerModal((p) => !p)}
        />
      )}
    </>
  );
};

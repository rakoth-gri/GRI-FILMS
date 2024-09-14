import { useEffect, useState, ReactNode } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { Span } from "../../components/Span/Span";
import { MyTitle } from "../../components/MyTitle";
import { MyLoader } from "../../components/MyLoader";
import { MyTrailer } from "../../components/MyTrailer";
import { MoviePersonsCard } from "../../components/MoviePersonsCard";
import { SimilarMoviesCard } from "../../components/SimilarMoviesCard";
import { LinkButton } from "../../components/LinkButton";
import { SingleMoviePropsList } from "../../components/SingleMoviePropsList";
import { MyLabel } from "../../components/MyLabel";
import { Back } from "../../components/Back";
import { MyFacts } from "../../components/MyFacts";
// consts
import { END_POINTS } from "../../consts/api";
// types
import { RootState } from "../../store/store";
import { I_MOVIE, I_SIMILAR_MOVIES_PROP, E_ROUTES } from "../../types/types";
import { MyFlexContainer } from "../../components/MyFlexContainer";
// utils:
import { movieLengthFormat, getBoxStyles } from "../../services/utils";

const MyTrailerTrigger = styled(Button)(({ theme }) => ({
  textTransform: "uppercase",
  letterSpacing: "0.7px",
  backgroundColor: theme.palette.warning.main,
  borderRadius: "12px",
  color: "white",
}));

const cardMediaStyles = {
  width: "100%",
  objectFit: "cover",
  filter: "grayscale(50%)",
  "&:hover": { filter: "none" },
};

const prepareToRender = <T extends object>(
  l: T[],
  title: string,
  cb: (item: T) => ReactNode
) =>
  l.length ? <SingleMoviePropsList list={l} title={title} cb={cb} /> : null;

export const SingleMoviePage = () => {
  const dispatch = useAppDispatch();
  const [isTrailerModal, setIsTrailerModal] = useState(false);

  const location = useNavigate();

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
    facts,
  } = movie as I_MOVIE;

  return (
    <>
      <Back onClick={() => location(-1)}> Назад </Back>
      <MyFlexContainer
        align="start"
        id={`${id}`}
        spacing={1}
        sx={{ m: "1rem" }}
      >
        <Box sx={getBoxStyles({ width: "24%", height: "400px" })}>
          <CardMedia
            component={"img"}
            src={poster}
            title={enName}
            sx={cardMediaStyles}
          />
          <MyLabel sx={{ top: "3%", left: "4%" }}>
            {" "}
            {!!top250 && `ТОП ${top250}`}{" "}
          </MyLabel>
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
              justify: "space-between",
              mr: "0px",
            })}
          >
            <Span cls="title">Год производства</Span>
            <Span cls="desc">{year}</Span>
            <Span cls="title"> Страна</Span>
            <Span cls="desc"> {countries.join(", ")}</Span>
            <Span cls="title"> Жанр </Span>
            <Span cls="desc"> {genres.join(", ")}</Span>
            <Span cls="title">Слоган</Span>
            <Span cls="desc">
              {" "}
              <strong>
                {" "}
                <q>{slogan}</q>{" "}
              </strong>
            </Span>
            <Span cls="title">Сборы в России</Span>
            <Span cls="desc"> {feesRussia} </Span>
            <Span cls="title">Сборы в Мире</Span>
            <Span cls="desc"> {feesWorld}</Span>
            <Span cls="title">Премьера в России</Span>
            <Span cls="desc">
              {premiereRussia
                ? new Date(premiereRussia).toLocaleDateString() + " г."
                : "-"}
            </Span>
            <Span cls="title">Премьера в Мире</Span>
            <Span cls="desc">
              {premiereWorld
                ? new Date(premiereWorld).toLocaleDateString() + " г."
                : "-"}
            </Span>
            <Span cls="title">Продолжительность </Span>
            <Span cls="desc"> {movieLengthFormat(movieLength)}</Span>
            <Span cls="title">Возраст </Span>
            <Span cls="desc"> {ageRating}+ </Span>
            <Span cls="title">Рейтинг IMDB </Span>
            <Span cls="desc"> {ratingImdb} </Span>
            <Span cls="title">Бюджет </Span>
            <Span cls="desc"> {budget} </Span>
            <Span cls="title">Тип картины </Span>
            <Span cls="desc"> {type} </Span>
          </Box>
        </Box>
        <Box
          sx={{
            ...getBoxStyles({
              width: "24%",
              fs: "0.92em",
              fw: 700,
              pd: "0.5rem",
              display: "flex",
              align: "center",
            }),
            opacity: "0.84",
          }}
        >
          <MyTitle
            variant="subtitle"
            component="h4"
            color="inherit"
            sx={{ m: "0.3rem" }}
          >
            Рейтинг и оценки:
          </MyTitle>
          <Span cls="rating"> {ratingKp.toFixed(1)} </Span>
          <Span cls="votes"> KP: {votesKp} оценок </Span>
          <Span cls="votes"> IMDB: {votesImdb} оценок </Span>          
          <MyTitle
            variant="subtitle"
            component="h4"
            color="inherit"
            sx={{ m: "0.3rem" }}
          >
            В главных ролях:
          </MyTitle>
          <>
            {persons.slice(0, 8).map((p, i) => (
              <Link to={`${E_ROUTES.persons}/${p.id}`} key={p.id}>
                <Span className="actors"> {p.name} </Span>
              </Link>
            ))}
          </>          
        </Box>
      </MyFlexContainer>
      <Box sx={getBoxStyles({ mr: "0.25rem" })}>
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
      {prepareToRender(
        similarMovies,
        "Вам также могут понравяться:",
        (movie: I_SIMILAR_MOVIES_PROP) => (
          <SimilarMoviesCard key={movie.id} {...movie} />
        )
      )}
      <Divider />
      {prepareToRender(
        sequelsAndPrequels,
        "Сиквелы и Приквелы:",
        (movie: I_SIMILAR_MOVIES_PROP) => (
          <SimilarMoviesCard key={movie.id} {...movie} />
        )
      )}
      <Divider />
      {prepareToRender(
        persons,
        "Актеры и Создатели:",
        (item: any, i?: number) => (
          <MoviePersonsCard key={i} {...item} />
        )
      )}
      <Divider />
      <Box sx={getBoxStyles({ mr: "0.5rem" })}>
        <MyTitle variant="h6" component={"h3"} align="center" color="inherit">
          Факты и подробности производства:
        </MyTitle>
        <MyFacts facts={facts} />
      </Box>
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
          }}
          onClick={() => setIsTrailerModal(true)}
        >
          {" "}
          См. Трейлер{" "}
        </Button>
        <LinkButton
          route={E_ROUTES.reviews}
          id={movieId}
          variant="outlined"
          sx={{
            letterSpacing: "0.8px",
            fontFamily: "Montserrat",
            textTransform: "none",
            fontSize: "1.02em",
          }}
          linkProps={name}
        >
          {" "}
          Отзывы{" "}
        </LinkButton>
      </MyFlexContainer>
      {isTrailerModal && (
        <MyTrailer
          url={videos?.url}
          name={videos?.name}
          sx={{ background: "rgba(0,0,0, .85)", m: "0px" }}
          onClick={() => setIsTrailerModal((p) => !p)}
        />
      )}
    </>
  );
};


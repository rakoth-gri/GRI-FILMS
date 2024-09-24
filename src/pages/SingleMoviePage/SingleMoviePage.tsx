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
import StarRateIcon from "@mui/icons-material/StarRate";
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
  height: "100%",
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

  const movie = useAppSelector((s: RootState) => s.movieSliceReducer.movie);
  const loading = useAppSelector((s: RootState) => s.movieSliceReducer.loading);
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
      <Back onClick={() => location(-1)}> {null} </Back>
      <MyFlexContainer
        id={`${id}`}
        spacing={1}
        sx={{
          height: { xs: "auto" },
        }}
        align={{ xs: "start" }}
        wrap={{ xs: "wrap", lg: "nowrap" }}
        mr={{ xs: "0px", sm: "0.2rem", md: "1rem" }}
        justify="space-between"
      >
        <Box
          sx={getBoxStyles({
            width: { xs: "95%", sm: "42%", lg: "23%" },
            height: "400px",
            pd: "0px",
          })}
        >
          <CardMedia
            component={"img"}
            src={poster}
            title={enName}
            sx={cardMediaStyles}
          />
          <MyLabel
            sx={{
              top: "5%",
              left: "2%",
              backgroundColor: "rgba(0,0,0, .12)",
              fontFamily: "Merienda",
              backdropFilter: "blur(1px)",
              fontWeight: 700,
            }}
          >
            {" "}
            {top250 ? `ТОП ${top250}` : null}
          </MyLabel>
        </Box>
        <Box
          sx={getBoxStyles({
            height: "auto",
            width: { xs: "95%", sm: "50%", md: "48%" },
            justify: "flex-start",
            align: "center",
            pd: "0px",
          })}
        >
          <MyTitle
            align="left"
            color="inherit"
            component="h1"
            variant="h4"
            sx={{ fontWeight: "bold", fontSize: { xs: "1.35em", lg: "2em" } }}
          >
            {name} ({year})
          </MyTitle>
          <Box
            sx={{
              ...getBoxStyles({
                fw: 700,
                ta: "left",
                display: "flex",
                align: "center",
                direction: "row",
                justify: "flex-start",
              }),
              opacity: "0.84",
            }}
          >
            Рейтинг:{" "}
            {new Array(Math.round(ratingKp)).fill("").map((_, i) => (
              <StarRateIcon
                key={i}
                fontSize="medium"
                sx={{ color: "var(--app-star-color)", ml: "0.25rem" }}
              />
            ))}
          </Box>
          <MyTrailerTrigger
            startIcon={<PlayCircleFilledIcon />}
            onClick={() => setIsTrailerModal(true)}
            variant={"contained"}
          >
            См. Трейлер
          </MyTrailerTrigger>
          <MyTitle
            variant="h5"
            component={"h3"}
            align="left"
            color="inherit"
            sx={{
              width: "100%",
              fontSize: { xs: "1.15rem", md: "1.5rem" },
              m: "1rem 0px 0px 0px",
            }}
          >
            {" "}
            О Фильме:{" "}
          </MyTitle>
          <Box
            sx={getBoxStyles({
              display: "flex",
              direction: "row",
              justify: "space-between",
              mr: "0px",
              align: "stretch",
              fs: { xs: "13px", lg: "1em" },
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
            <Span cls="desc">
              {" "}
              <strong>{feesRussia}</strong>{" "}
            </Span>
            <Span cls="title">Сборы в Мире</Span>
            <Span cls="desc">
              {" "}
              <strong>{feesWorld}</strong>
            </Span>
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
            <Span cls="title"> Режиссер </Span>
            <Span cls="desc director">
              {" "}
              {persons.find((p) => p.profession === "режиссеры")?.name}
            </Span>
            <Span cls="title">Возраст </Span>
            <Span cls="desc"> {ageRating}+ </Span>
            <Span cls="title">Рейтинг IMDB </Span>
            <Span cls="desc"> {ratingImdb} </Span>
            <Span cls="title">Бюджет </Span>
            <Span cls="desc">
              {" "}
              <strong>{budget}</strong>{" "}
            </Span>
            <Span cls="title">Тип картины </Span>
            <Span cls="desc"> {type} </Span>
          </Box>
        </Box>
        <Box
          sx={{
            ...getBoxStyles({
              fw: 300,
              pd: "0.1rem",
              display: "flex",
              align: "start",
              fs: { xs: "13px", lg: "1em" },
              justify: "center",
              width: { xs: "50%", md: "22%" },
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
          <Span cls="rating"> KP: {ratingKp.toFixed(1)} </Span>
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
                <Span cls="actors"> {p.name} </Span>
              </Link>
            ))}
          </>
        </Box>
      </MyFlexContainer>
      <Divider />
      <Box sx={getBoxStyles({ mr: "0px" })}>
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
            m: "0.5rem",
            fontSize: { xs: "13px", lg: "1em" },
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
      <Box sx={getBoxStyles({ mr: { xs: "0px", md: "0.5rem" } })}>
        <MyTitle variant="h6" component={"h3"} align="center" color="inherit">
          Факты и подробности производства:
        </MyTitle>
        <MyFacts facts={facts} sx={{ fontSize: { xs: "13px", md: "16px" } }} />
      </Box>
      <MyFlexContainer
        justify="center"
        spacing={{ xs: 1, sm: 2 }}
        mr={{ sx: "0px", sm: "0.5rem" }}
      >
        <LinkButton
          route={E_ROUTES.images}
          id={movieId}
          variant="outlined"
          sx={{
            letterSpacing: "0.8px",
            fontFamily: "Montserrat",
            textTransform: "none",
            fontSize: { xs: "11px", sm: "14px", md: "1em" },
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
            fontSize: { xs: "11px", sm: "14px", md: "1em" },
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
            fontSize: { xs: "11px", sm: "14px", md: "1em" },
          }}
          linkProps={name}
        >
          {" "}
          Отзывы{" "}
        </LinkButton>
      </MyFlexContainer>
      {isTrailerModal && (
        <MyTrailer
          videos={videos}
          sx={{ background: "rgba(0,0,0, .85)", m: "0px" }}
          onClick={() => setIsTrailerModal((p) => !p)}
        />
      )}
    </>
  );
};

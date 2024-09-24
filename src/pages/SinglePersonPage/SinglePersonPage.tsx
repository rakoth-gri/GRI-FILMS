import {
  useEffect,
  useState,
  MouseEventHandler,
  ReactNode,
  useCallback,
} from "react";
import { useParams, useNavigate } from "react-router-dom";
// REDUX:
import { personByIdThunk, personAwardsThunk } from "../../store/personThunks";
import { changePersonStateQueryParams } from "../../store/personSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { cleanUpSinglePersonInfo } from "../../store/personSlice";
// components
import { Link } from "react-router-dom";
import { Box, CardMedia, Divider } from "@mui/material";
import { Span } from "../../components/Span/Span";
import { SimilarMoviesCard } from "../../components/SimilarMoviesCard";
import { MyFlexContainer } from "../../components/MyFlexContainer";
import { Back } from "../../components/Back";
import { MyFilterTrigger } from "../../components/MyFilterTrigger";
import { MySortType } from "../../components/MySortType";
import { SingleMoviePropsList } from "../../components/SingleMoviePropsList";
import { MyTitle } from "../../components/MyTitle";
import { MyFacts } from "../../components/MyFacts";
import { MySelect } from "../../components/MySelect";
import { PersonAwardCard } from "../../components/PersonAwardCard";
import { MyLoader } from "../../components/MyLoader";
import { MyFilterWrapper } from "../../components/MyFilterWrapper";
import { MyError } from "../../components/MyError/MyError";
import { MyPagination } from "../../components/MyPagination";
// consts
import {
  END_POINTS,
  SORTTYPE_SELECT_LIST,
  LIMIT_PARAM_SELECT_LIST,
} from "../../consts/api";
// types
import { RootState } from "../../store/store";
import {
  I_PERSON_AWARDS,
  I_PERSON_FULL,
  E_ROUTES,
  I_PERSON_MOVIES,
} from "../../types/types";
// utils
import {
  getBoxStyles,
  birthDetailsFormat,
  composed,
} from "../../services/utils";

const cardMediaStyles = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  filter: "grayscale(50%)",
  "&:hover": { filter: "none" },
};

const myFactsStyles = { fontSize: { xs: "13px", md: "16px" } };

const prepareToRender = <T extends object>(
  l: T[],
  title: string,
  cb: (item: T) => ReactNode
) =>
  l.length ? <SingleMoviePropsList list={l} title={title} cb={cb} /> : null;

const prepareToRenderCallback = (movie: I_PERSON_MOVIES, i?: number) => (
  <SimilarMoviesCard key={i} {...movie} />
);

const personAwardsCallback = (personAwards: I_PERSON_AWARDS, i?: number) => (
  <PersonAwardCard key={i} {...personAwards} />
);

export const SinglePersonPage = () => {
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const dispatch = useAppDispatch();
  const location = useNavigate();
  const { personId } = useParams();

  // const { person, personAwards, page, loading, error } = useAppSelector(
  //   (s: RootState) => s.personSliceReducer
  // );

  const person = useAppSelector((s: RootState) => s.personSliceReducer.person);
  const personAwards = useAppSelector(
    (s: RootState) => s.personSliceReducer.personAwards
  );
  const page = useAppSelector((s: RootState) => s.personSliceReducer.page);
  const loading = useAppSelector(
    (s: RootState) => s.personSliceReducer.loading
  );

  useEffect(() => {
    personId &&
      dispatch(
        personByIdThunk({
          url: `${END_POINTS.person}/${personId}`,
          id: 0,
          method: "personById",
        })
      );
  }, [personId]);

  useEffect(() => {
    personId &&
      dispatch(
        personAwardsThunk({
          url: END_POINTS.personAwards,
          personId,
          method: "personAwards",
        })
      );
  }, [page]);

  useEffect(() => {
    return () => {
      dispatch(cleanUpSinglePersonInfo());
    };
  }, []);

  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    personId &&
      dispatch(
        personAwardsThunk({
          url: END_POINTS.personAwards,
          personId,
          method: "personAwards",
        })
      );
  };

  const stopPropagation: MouseEventHandler<HTMLElement> = useCallback(
    (e) => e.stopPropagation(),
    []
  );

  if (!Object.keys(person).length) return <MyLoader loading={true} />;

  const {
    id,
    photo,
    name,
    enName,
    sex,
    growth,
    birthday,
    death,
    age,
    birthPlace,
    deathPlace,
    profession,
    countAwards,
    facts,
    movies,
  } = person as I_PERSON_FULL;

  return (
    <>
      <MyFlexContainer direction="row" justify="space-between" spacing={2}>
        <Back onClick={() => location(-1)}> {null} </Back>
        <MyFilterTrigger onClick={() => setIsOpenFilter((p) => !p)} />
      </MyFlexContainer>
      <MyLoader loading={loading} />
      <MyFlexContainer
        id={`${id}`}
        spacing={1}
        sx={{
          height: { xs: "auto", lg: "500px" },
        }}
        align={{ xs: "start", md: "center" }}
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
            src={photo}
            title={enName}
            sx={cardMediaStyles}
          />
        </Box>
        <Box
          sx={getBoxStyles({
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
            {name}
          </MyTitle>
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
            О персоне:{" "}
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
            <Span cls="title">Карьера</Span>
            <Span cls="desc">{profession}</Span>
            <Span cls="title"> Рост </Span>
            <Span cls="desc"> {growth ? `${growth} см.` : "-"} </Span>
            <Span cls="title"> Дата рождения </Span>
            <Span cls="desc">
              {" "}
              {birthday ? birthDetailsFormat(birthday) : "-"}{" "}
            </Span>
            <Span cls="title"> Место рождения </Span>
            <Span cls="desc"> {birthPlace} </Span>
            <Span cls="title"> Всего фильмов </Span>
            <Span cls="desc"> {movies.length}</Span>
            <Span cls="title"> Возраст </Span>
            <Span cls="desc"> {age} </Span>
            <Span cls="title"> Пол </Span>
            <Span cls="desc"> {sex} </Span>
            <Span cls="title"> Количество наград и номинаций </Span>
            <Span cls="desc"> {countAwards} </Span>
            <Span cls="title"> Дата смерти </Span>
            <Span cls="desc">
              {" "}
              {death &&
                `${new Date(death).toLocaleDateString()} г., ${deathPlace}`}
            </Span>
          </Box>
        </Box>
        <Box
          sx={{
            ...getBoxStyles({
              mr: { xs: "0px", md: "0.5rem" },
              fw: 300,
              pd: "0.1rem",
              display: "flex",
              align: "start",
              fs: { xs: "13px", lg: "1em" },
              justify: { xs: "space-between", sm: "center" },
              direction: "column",
              width: { xs: "100%", lg: "22%" },
            }),
            opacity: "0.8",
          }}
        >
          <MyTitle
            variant="subtitle2"
            component="h4"
            color="inherit"
            sx={{
              width: { xs: "100%", lg: "auto" },
              fontWeight: "bold",
              textAlign: "left",
            }}
          >
            Лучшие фильмы:
          </MyTitle>
          <>
            {composed(movies).map((m) => (
              <Link to={`${E_ROUTES.movies}/${m.id}`} key={m.id}>
                <Span cls="actors"> {m.name} </Span>
              </Link>
            ))}
          </>
        </Box>
      </MyFlexContainer>
      {/* Cледущие компоненты -------------------------- */}
      <MyFilterWrapper
        isOpenFilter={isOpenFilter}
        onClick={() => setIsOpenFilter((prev) => !prev)}
        sx={{ m: "0px", p: "1rem" }}
        action={clickHandler}
        actionText="Обновить награды"
      >
        {" "}
        <MySelect
          list={LIMIT_PARAM_SELECT_LIST}
          name={"limit"}
          action={changePersonStateQueryParams}
          reducer={"personSliceReducer"}
          onClick={stopPropagation}
        />
        <MySortType
          list={SORTTYPE_SELECT_LIST}
          name={"sortType"}
          reducer="personSliceReducer"
          action={changePersonStateQueryParams}
          onClick={stopPropagation}
        />
      </MyFilterWrapper>
      <Divider />
      {personAwards.length ? (
        <SingleMoviePropsList
          list={personAwards}
          type="awards"
          title="Награды"
          cb={personAwardsCallback}
        />
      ) : (
        <MyError> По Вашему запросу ничего не найдено... </MyError>
      )}
      <MyPagination
        page={page}
        action={changePersonStateQueryParams}
        reducer="personSliceReducer"
      />
      {prepareToRender(
        movies,
        "Фильмы, ШОУ, кинопремии:",
        prepareToRenderCallback
      )}
      <Divider />
      <Box sx={getBoxStyles({ mr: { xs: "0px", md: "0.5rem" } })}>
        <MyTitle variant="h6" component={"h3"} align="center" color="inherit">
          А Вы знали, что ...
        </MyTitle>
        <MyFacts facts={facts} sx={myFactsStyles} />
      </Box>
    </>
  );
};

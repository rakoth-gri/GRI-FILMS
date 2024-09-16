import { useEffect, useState, MouseEventHandler } from "react";
import { useParams, useNavigate } from "react-router-dom";
// REDUX:
import { personByIdThunk, personAwardsThunk } from "../../store/personThunks";
import { changePersonStateQueryParams } from "../../store/personSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { cleanUpSinglePersonInfo } from "../../store/personSlice";
// components
import { Link } from "react-router-dom";
import { Button, Box, CardMedia, Divider } from "@mui/material";
import { Span } from "../../components/Span/Span";
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
import { I_PERSON_AWARDS, I_PERSON_FULL, E_ROUTES } from "../../types/types";
// utils
import {
  getBoxStyles,
  birthDetailsFormat,
  composed,
} from "../../services/utils";

const cardMediaStyles = {
  width: "100%",
  height: "95%",
  objectFit: "cover",
  filter: "grayscale(50%)",
  "&:hover": { filter: "none" },
};

export const SinglePersonPage = () => {
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const dispatch = useAppDispatch();
  const location = useNavigate();
  const { personId } = useParams();
  const { person, personAwards, page, loading, error } = useAppSelector(
    (s: RootState) => s.personSliceReducer
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
        <Back onClick={() => location(-1)}> Назад </Back>
        <MyFilterTrigger onClick={() => setIsOpenFilter((p) => !p)} />
      </MyFlexContainer>
      <MyLoader loading={loading} />
      <MyFlexContainer
        align="center"
        id={`${id}`}
        spacing={1}
        sx={{ m: "1rem", height: "520px" }}
      >
        <Box sx={getBoxStyles({ width: "23%", height: "400px", pd: "0px" })}>
          <CardMedia
            component={"img"}
            src={photo}
            title={enName}
            sx={cardMediaStyles}
          />
        </Box>
        <Box
          sx={getBoxStyles({
            width: "49%",
            display: "flex",
            justify: "flex-start",
            align: "center",
          })}
        >
          <MyTitle align="left" color="inherit" component="h1" variant="h4">
            {name}
          </MyTitle>
          <MyTitle
            variant="h5"
            component={"h3"}
            align="left"
            color="inherit"
            sx={{ width: "100%" }}
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
            })}
          >
            <Span cls="title">Карьера</Span>
            <Span cls="desc">{profession}</Span>
            <Span cls="title"> Рост </Span>
            <Span cls="desc"> {growth ? `${growth} см.` : '-'} </Span>
            <Span cls="title"> Дата рождения </Span>
            <Span cls="desc"> {birthday ? birthDetailsFormat(birthday) : '-'} </Span>
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
              fw: 300,
              pd: "0.1rem",
              display: "flex",
              align: "start",
              fs: "0.95em",
              justify: "center",
              width: "22%",
            }),
            opacity: "0.8",
          }}
        >
          <MyTitle variant="subtitle" component="h4" color="inherit">
            Лучшие фильмы:
          </MyTitle>
          <>
            {composed(movies).map((m, i) => (
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
      >
        {" "}
        <MySelect
          list={LIMIT_PARAM_SELECT_LIST}
          name={"limit"}
          action={changePersonStateQueryParams}
          reducer={"personSliceReducer"}
          onClick={(e) => e.stopPropagation()}
        />
        <MySortType
          list={SORTTYPE_SELECT_LIST}
          name={"sortType"}
          reducer="personSliceReducer"
          action={changePersonStateQueryParams}
          onClick={(e) => e.stopPropagation()}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: "0.5rem", width: "90%" }}
          onClick={clickHandler}
        >
          {" "}
          обновить награды{" "}
        </Button>
      </MyFilterWrapper>
      <Divider />
      {personAwards.length ? (
        <SingleMoviePropsList
          list={personAwards}
          type="awards"
          title={"Награды"}
          cb={(personAwards: I_PERSON_AWARDS, i?: number) => (
            <PersonAwardCard key={i} {...personAwards} />
          )}
        />
      ) : (
        <MyError> По Вашему запросу ничего не найдено... </MyError>
      )}
      <MyPagination
        action={changePersonStateQueryParams}
        reducer="personSliceReducer"
      />
      <Divider />
      <Box sx={getBoxStyles({ mr: "0.5rem" })}>
        <MyTitle variant="h6" component={"h3"} align="center" color="inherit">
          А Вы знали, что ...
        </MyTitle>
        <MyFacts facts={facts} />
      </Box>
    </>
  );
};

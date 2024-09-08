import { Fragment, useEffect, useState, MouseEventHandler } from "react";
import { useParams } from "react-router-dom";
// REDUX:
import { personByIdThunk, personAwardsThunk } from "../../store/personThunks";
import { changePersonStateQueryParams } from "../../store/personSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { cleanUpSinglePersonInfo } from "../../store/personSlice";
// components
import { Button } from "@mui/material";
import { MyFilterTrigger } from "../../components/MyFilterTrigger";
import { MySortType } from "../../components/MySortType";
import { MyTitle } from "../../components/MyTitle";
import { PersonFacts } from "../../components/PersonFacts";
import { MySelect } from "../../components/MySelect";
import { ContainerForLists } from "../../components/ContainerForLists";
import { PersonAwardCard } from "../../components/PersonAwardCard";
import { MyLoader } from "../../components/MyLoader";
import { MyFilterWrapper } from "../../components/MyFilterWrapper";
import { MyError } from "../../components/MyError/MyError";
import { MyPagination } from "../../components/MyPagination";
// consts
import {
  END_POINTS,
  SORTTYPE_SELECT_LIST,
  PERSON_AWARDS_SORTFIELD_SELECT_LIST,
  LIMIT_PARAM_SELECT_LIST,
} from "../../consts/api";
// types
import { RootState } from "../../store/store";
import { I_PERSON_AWARDS, I_PERSON_FULL } from "../../types/types";

// const personId = 8816;
export const SinglePersonPage = () => {
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  const dispatch = useAppDispatch();

  const { personId } = useParams();
  const { person, personAwards, page, loading, error } =
    useAppSelector((s: RootState) => s.personSliceReducer);

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

  return (
    <Fragment>
      <MyFilterTrigger onClick={() => setIsOpenFilter((p) => !p)} />
      <MyTitle
        align="center"
        color="primary"
        component="h1"
        variant="h4"        
      >
        {" "}
        SINGLE PERSON: {personId}
      </MyTitle>
      <MyFilterWrapper
        isOpenFilter={isOpenFilter}
        onClick={() => setIsOpenFilter((prev) => !prev)}
      >
        <MySelect
          list={PERSON_AWARDS_SORTFIELD_SELECT_LIST}
          name={"sortField"}
          action={changePersonStateQueryParams}
          reducer={"personSliceReducer"}
          onClick={(e) => e.stopPropagation()}
        />
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
          начать поиск{" "}
        </Button>
      </MyFilterWrapper>
      <MyLoader loading={loading} />
      {!!personAwards.length && !error ? (
        <>
          <ContainerForLists
            type="awards"
            list={personAwards}
            cb={(personAwards: I_PERSON_AWARDS, i?: number) => (
              <PersonAwardCard key={i} {...personAwards} />
            )}
          />
        </>
      ) : (
        <MyError> {error}</MyError>
      )}
      {Object.keys(person).length && !error ? (
        <>
          <PersonFacts facts={(person as I_PERSON_FULL).facts} />
        </>
      ) : (
        <MyError> {error} </MyError>
      )}
      <MyPagination
        action={changePersonStateQueryParams}
        reducer="personSliceReducer"
      />
    </Fragment>
  );
};

import { useEffect, MouseEventHandler, useState } from "react";
// REDUX
import { reviewByMovieIdThunk } from "../../store/reviewThunks";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { changeReviewStateQueryParams } from "../../store/reviewSlice";
import { RootState } from "../../store/store";
// REACT_ROUTER_DOM
import { useParams } from "react-router-dom";
// components
import { Divider } from "@mui/material";
import { MyFlexContainer } from "../../components/MyFlexContainer";
import { MyFilterTrigger } from "../../components/MyFilterTrigger";
import { MyPagination } from "../../components/MyPagination";
import { Back } from "../../components/Back";
import { MyTitle } from "../../components/MyTitle";
import { MyFilterWrapper } from "../../components/MyFilterWrapper";
import { MySelect } from "../../components/MySelect";
import { MySortType } from "../../components/MySortType";
import { Button } from "@mui/material";
// consts
import {
  END_POINTS,
  REVIEW_SORTFIELD_SELECT_LIST,
  LIMIT_PARAM_SELECT_LIST,
  SORTTYPE_SELECT_LIST,
} from "../../consts/api";
// types
import { E_ROUTES } from "../../types/types";

export const ReviewsPage = () => {
  const dispatch = useAppDispatch();
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  const { sortField, limit, sortType, page } = useAppSelector(
    (s: RootState) => s.reviewSliceReducer
  );
  const { movieId } = useParams();

  useEffect(() => {
    movieId &&
      dispatch(
        reviewByMovieIdThunk({
          url: `${END_POINTS.review}`,
          movieId,
          method: "reviewByMovieId",
        })
      );
  }, [page]);

  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    movieId &&
      dispatch(
        reviewByMovieIdThunk({
          url: END_POINTS.review,
          movieId,
          method: "reviewByMovieId",
        })
      );
  };

  return (
    <>
      <MyFlexContainer direction="row" justify="space-between" spacing={2}>
        <Back to={`${E_ROUTES.movies}/${movieId}`}> Назад </Back>
        <MyFilterTrigger onClick={() => setIsOpenFilter((p) => !p)} />
      </MyFlexContainer>
      <MyTitle variant="h4">Отзывы к Фильму c ID: {movieId}</MyTitle>
      {/* Cледущие компоненты -------------------------- */}
      <MyFilterWrapper
        isOpenFilter={isOpenFilter}
        onClick={() => setIsOpenFilter((prev) => !prev)}
      >
        <MySelect
          list={REVIEW_SORTFIELD_SELECT_LIST}
          name={"sortField"}
          action={changeReviewStateQueryParams}
          reducer={"reviewSliceReducer"}
          onClick={(e) => e.stopPropagation()}
        />
        <MySelect
          list={LIMIT_PARAM_SELECT_LIST}
          name={"limit"}
          action={changeReviewStateQueryParams}
          reducer={"reviewSliceReducer"}
          onClick={(e) => e.stopPropagation()}
        />
        <MySortType
          list={SORTTYPE_SELECT_LIST}
          name={"sortType"}
          reducer="reviewSliceReducer"
          action={changeReviewStateQueryParams}
          onClick={(e) => e.stopPropagation()}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: "0.5rem", width: "90%" }}
          onClick={clickHandler}
        >
          {" "}
          обновить отзывы{" "}
        </Button>
      </MyFilterWrapper>
      <Divider />
      <MyPagination
        action={changeReviewStateQueryParams}
        reducer="reviewSliceReducer"
        size="large"
      />
    </>
  );
};

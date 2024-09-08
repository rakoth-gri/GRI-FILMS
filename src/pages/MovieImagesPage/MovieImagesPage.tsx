import { useEffect, useState, MouseEventHandler, FC, Fragment } from "react";
import { useParams } from "react-router-dom";
// REDUX
import { movieIdImagesThunk } from "../../store/movieThunks";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  changeMovieStateQueryParams,
  movieImagesPageCleanUp,
} from "../../store/movieSlice";
// components
import {
  Box,
  Button,
  CardMedia,
  ImageList,
  ImageListItem,
} from "@mui/material";
import { MyPagination } from "../../components/MyPagination";
import { MyFlexContainer } from "../../components/MyFlexContainer";
import { MyImagesModal } from "../../components/MyImagesModal";
import { MySelect } from "../../components/MySelect";
import { MyFilterWrapper } from "../../components/MyFilterWrapper";
import { MyFilterTrigger } from "../../components/MyFilterTrigger";
import { I_IMAGE } from "../../types/types";
import { Render } from "../../components/Render";
import { MyTitle } from "../../components/MyTitle";
import { MySortType } from "../../components/MySortType";
// consts
import {
  END_POINTS,
  SORTTYPE_SELECT_LIST,
  LIMIT_PARAM_SELECT_LIST,  
} from "../../consts/api";
// types:

const BoxStyles = {
  width: "30%",
  height: "500px",
  objectFit: "cover",
  p: "0.5rem",
};

const CardMediaStyles = {
  width: "100%",
  height: "100%",
  "&:hover": {
    transform: "scale(1.05)",
  },
};

export const MovieImagesPage: FC = () => {
  const dispatch = useAppDispatch();

  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [isModalShown, setIsModalShown] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  const { movieId } = useParams();

  const { images, page, loading, error} = useAppSelector((s) => s.movieSliceReducer);

  useEffect(() => {
    if (movieId)
      dispatch(
        movieIdImagesThunk({ url: END_POINTS.image, movieId, method: "image" })
      );
  }, [page, movieId]);

  useEffect(() => {
    return () => {
      dispatch(movieImagesPageCleanUp());
    };
  }, []);

  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (movieId)
      dispatch(
        movieIdImagesThunk({ url: END_POINTS.image, movieId, method: "image" })
      );
  };

  const imageClick = (id: string) => {   
    setIsModalShown(p => !p)
    setStartIndex(+id)    
  }

  return (
    <Fragment>
      {isModalShown && <MyImagesModal startIndex={startIndex} images={images} onClick={() => setIsModalShown(p => !p)}/>}
      <MyTitle
        align="center"
        color="primary"
        component="h1"
        variant="h4"        
      >
        Постеры и изображения:
      </MyTitle>
      <MyFilterTrigger onClick={() => setIsOpenFilter((p) => !p)} />
      <MyFilterWrapper
        isOpenFilter={isOpenFilter}
        onClick={() => setIsOpenFilter((prev) => !prev)}
      >        
        <MySelect
          list={LIMIT_PARAM_SELECT_LIST}
          name={"limit"}
          action={changeMovieStateQueryParams}
          reducer={"movieSliceReducer"}
          onClick={(e) => e.stopPropagation()}
        />
        <MySortType
          list={SORTTYPE_SELECT_LIST}
          name={"sortType"}
          reducer="movieSliceReducer"
          action={changeMovieStateQueryParams}
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
      <ImageList variant="masonry" cols={3} gap={8}>
        <Render
          list={images}
          loading={loading}
          error={error}
          cb={(image: I_IMAGE, i: number) => (
            <ImageListItem key={image.id}>
              <img
                srcSet={`${image.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${image.url}?w=248&fit=crop&auto=format`}
                alt={image.id}
                loading="lazy"
                onClick={(e) => imageClick(e.target.dataset.id)}
                data-id={i}
              />
            </ImageListItem>
          )}
        />
      </ImageList>
      <MyPagination
        action={changeMovieStateQueryParams}
        reducer="movieSliceReducer"
      />
    </Fragment>
  );
};



{
  /* <MyFlexContainer spacing={0}>
        <Render
          list={images}
          loading={loading}
          error={error}
          cb={(image: I_IMAGE) => (
            <Box key={image.id} sx={BoxStyles}>
              <CardMedia src={image.url} alt={image.id} component='img' loading="lazy" sx={CardMediaStyles}/>
            </Box>
          )}
        />
      </MyFlexContainer> */
}

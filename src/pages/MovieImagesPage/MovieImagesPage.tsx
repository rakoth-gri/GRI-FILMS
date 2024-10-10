import { useEffect, useState, MouseEvent, FC, useMemo } from "react";
import { useParams } from "react-router-dom";
// RTK_QUERY
import { useGetMovieIdImagesQuery } from "../../store/rtk_query";
// components
import { MyLoader } from "../../components/MyLoader";
import { Back } from "../../components/Back";
import { MyImagesModal } from "../../components/MyImagesModal";
import { SimplePagination } from "../../components/SimplePagination";
import { MyTitle } from "../../components/MyTitle";
import { MyMasonry } from "../../components/MyMasonry";
// consts
import { END_POINTS, IMAGE_SELECTFIELDS_LIST } from "../../consts/api";
// types:
import { E_ROUTES } from "../../types/types";


export const MovieImagesPage: FC = () => {
  const { movieId } = useParams();

  const [state, setState] = useState({
    page: 1,
    pages: 0,
    startIndex: 0,
    isOpenFilter: false,
    isModalShown: false,
  });

  const {
    data: images,
    error,
    isLoading,
  } = useGetMovieIdImagesQuery({
    endPoint: END_POINTS.image,
    selectFieldList: IMAGE_SELECTFIELDS_LIST,
    method: "image",
    page: state.page,
    // @ts-ignore
    movieId,
  });

  useEffect(() => {
    window.scrollTo(0,0)
    if (images && !state.pages) {
      setState((p) => ({ ...p, pages: images.pages }));
    }
  }, [images]);

  const clickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    if ((e.target as HTMLButtonElement).closest("#next")) {
      return setState({ ...state, page: state.page + 1 });
    } else if ((e.target as HTMLButtonElement).closest("#prev")) {
      return setState({ ...state, page: state.page - 1 });
    }
    setState({ ...state, page: 1 });
  };

  const ImagesModalHandler = (id: number) => {
    setState((p) => ({ ...p, isModalShown: !p.isModalShown, startIndex: id }));
  };

  return (
    <>
      <Back to={`${E_ROUTES.movies}/${movieId}`}> {null} </Back>
      {state.isModalShown && images && (
        <MyImagesModal
          startIndex={state.startIndex}
          images={images?.data}
          onClick={() =>
            setState((p) => ({ ...p, isModalShown: !p.isModalShown }))
          }
        />
      )}
      <MyTitle
        align="center"
        color="inherit"
        component="h1"
        variant="h4"
        sx={{
          fontWeight: "bold",
          fontSize: { xs: "1.35em", lg: "2em" },
          m: { xs: "1rem 0.5rem", md: "0.5rem" },
        }}
      >
        постеры и изображения:
      </MyTitle>      
      <MyLoader color="info" variant="query" loading={isLoading} />
      <SimplePagination
        page={state.page}
        pages={state.pages}
        clickHandler={clickHandler}
      />
      {images && (
        <MyMasonry
          error={error as string}
          isLoading={isLoading}
          images={images.data}
          ImagesModalHandler={ImagesModalHandler}
        />
      )}
      
    </>
  );
};

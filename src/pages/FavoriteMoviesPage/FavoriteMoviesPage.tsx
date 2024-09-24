import { useAppDispatch, useAppSelector } from "../../store/store";
// createAsyncThunks
// components:
import { MyTitle } from "../../components/MyTitle";
import { MyMovieCard } from "../../components/MyMovieCard";
import { MyFlexContainer } from "../../components/MyFlexContainer";
import Render from "../../components/Render";
// types:
import { RootState } from "../../store/store";

export const FavoriteMoviesPage = () => {
  const dispatch = useAppDispatch();

  const favorites = useAppSelector((s: RootState) => s.movieSliceReducer.favorites);

  return (
    <>
      <MyTitle
        align="center"
        component="h1"
        variant="h4"
        sx={{
          color: "var(--app-default-color)",
          fontSize: { xs: "1.3rem", md: "2rem" },
        }}
      >
        избранные кинокартины:
      </MyTitle>
      <MyFlexContainer
        spacing={2}
        sx={{ minHeight: "45vh", margin: { xs: "0px" } }}
      >
        <Render
          list={favorites}
          loading={false}
          error={''}
          cb={(item: any) => <MyMovieCard key={item.id} {...item} />}
        />
      </MyFlexContainer>      
    </>
  );
};

import { Routes, Route } from "react-router-dom";
import { Template } from "./components/Template";
import { ThemeProvider } from "@mui/material";
import { myTheme } from "./theme/theme";
// consts
import { ROUTES } from "./routes/routes";
const authorId = 102193502;

function App() {
  // ! review -------------

  // useEffect(() => {
  //   dispatch(
  //     reviewByAuthorIdThunk({
  //       url: END_POINTS.review,
  //       authorId,
  //       method: "reviewByAuthorId",
  //     })
  //   );
  // }, [sortField, limit, sortType, page]);

  // useEffect(() => {
  //   dispatch(reviewByMovieIdThunk({url: END_POINTS.review, movieId: '8164', method: 'reviewByMovieId'}))
  //   }, [sortField, limit, sortType, page])

  return (
    <ThemeProvider theme={myTheme}>
      <Template>
        <Routes>
          {ROUTES.map(({ Element, path }) => (
            <Route path={path} key={path} element={<Element />} />
          ))}
        </Routes>
        {/* ФИЛЬТР ДЛЯ ОТЗЫВОВ ----- */}
        {/* <MyFlexContainer>
        <MySelect list={REVIEW_SORTFIELD_SELECT_LIST} name={"sortField"} action={changeReviewStateQueryParams} reducer={'reviewSliceReducer'}/>        
        <MySelect list={LIMIT_PARAM_SELECT_LIST} name={"limit"} action={changeReviewStateQueryParams} reducer={'reviewSliceReducer'}/>
        <MySortType list={SORTTYPE_SELECT_LIST} name={'sortType'} reducer='reviewSliceReducer' action={changeReviewStateQueryParams}/>       
      <MyFlexContainer>       */}
        {/* <MyPagination
        action={changeReviewStateQueryParams}
        reducer="reviewSliceReducer"
        size="large"        
      /> */}
      </Template>
    </ThemeProvider>
  );
}

export default App;

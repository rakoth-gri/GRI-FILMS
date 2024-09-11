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

  return (
    <ThemeProvider theme={myTheme}>
      <Template>
        <Routes>
          {ROUTES.map(({ Element, path }) => (
            <Route path={path} key={path} element={<Element />} />
          ))}
        </Routes>       
      </Template>
    </ThemeProvider>
  );
}

export default App;

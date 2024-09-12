import { Routes, Route } from "react-router-dom";
// REDUX
import { changeThemeParam } from "./store/themeSlice";
// components
import { Template } from "./components/Template";
import { ThemeProvider } from "@mui/material";
import { myTheme } from "./theme/theme";
// consts
import { ROUTES } from "./routes/routes";

function App() {  
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

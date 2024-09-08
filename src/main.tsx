import { createRoot } from "react-dom/client";
import { BrowserRouter as Nav } from "react-router-dom";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";
import App from "./App.tsx";
import "./index.sass";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <Nav>
      <App />
    </Nav>
  </Provider>
);

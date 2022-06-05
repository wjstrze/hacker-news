import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Articles } from "./features/articles/Articles";
import "./App.css";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="articles" element={<Articles />}>
            <Route path=":articleId" element={null} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

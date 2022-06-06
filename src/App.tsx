import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Articles } from "./views/articles/list/Articles";
import { ArticlesDetails } from "./views/articles/details/ArticleDetails";
import "./App.css";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="articles">
          <Route index element={<Articles />} />
          <Route path=":articleId" element={<ArticlesDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

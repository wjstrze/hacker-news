import { Provider } from "react-redux";
import { articlesStore } from "./store/articles-store";

import { ArticlesList } from "./components/list/ArticlesList";

export const Articles = () => {
  return (
    <Provider store={articlesStore}>
      <ArticlesList />
    </Provider>
  );
};

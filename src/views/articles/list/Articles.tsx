import { Provider } from "react-redux";
import { articlesStore } from "./store/articles-store";

import { ArticlesList, LoadMore, SearchInput } from "./components";
import styles from "./Articles.module.scss";

export const Articles = () => {
  return (
    <section className={styles.container}>
      <Provider store={articlesStore}>
        <SearchInput />
        <ArticlesList />
        <LoadMore />
      </Provider>
    </section>
  );
};

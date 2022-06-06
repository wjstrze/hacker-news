import { useEffect } from "react";
import { ChatIcon, StarIcon } from "@chakra-ui/icons";
import {
  selectArticles,
  fetchArticles,
  selectPage,
  selectPerPage,
  selectSearch,
} from "../../slice/articles-slice";
import {
  useArticlesSelector,
  useArticlesDispatch,
} from "../../hooks/articles-hooks";

import styles from "./ArticlesList.module.scss";

export const ArticlesList = () => {
  const articles = useArticlesSelector(selectArticles);
  const page = useArticlesSelector(selectPage);
  const perPage = useArticlesSelector(selectPerPage);
  const search = useArticlesSelector(selectSearch);
  const dispatch = useArticlesDispatch();

  useEffect(() => {
    dispatch(
      fetchArticles({
        page,
        search,
        perPage,
      })
    );
  }, [dispatch, page, perPage, search]);

  return (
    <>
      {articles.map((article) => (
        <article key={article.objectID}>
          <div>{article.author}</div>
          <div>{article.title}</div>
          <div>
            <ChatIcon />
            {article.num_comments}
          </div>
          <div>
            <StarIcon />
            {article.points}
          </div>
        </article>
      ))}
    </>
  );
};

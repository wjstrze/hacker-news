import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ChatIcon, StarIcon } from "@chakra-ui/icons";
import {
  selectArticles,
  fetchArticles,
  selectPage,
  selectPerPage,
  selectSearch,
  selectMetadata,
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
  const metadata = useArticlesSelector(selectMetadata);
  const dispatch = useArticlesDispatch();

  useEffect(() => {
    if (metadata?.page === page) {
      return;
    }
    dispatch(
      fetchArticles({
        page,
        search,
        perPage,
      })
    );
  }, [dispatch, page, perPage, search, metadata]);

  return (
    <>
      {articles.map((article) => (
        <Link to={article.objectID} key={article.objectID}>
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
        </Link>
      ))}
    </>
  );
};

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ChatIcon, StarIcon } from "@chakra-ui/icons";
import { Heading, Text } from "@chakra-ui/react";

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
    if (metadata?.page === page && metadata.query === search) {
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

  const formatDate = (utcDate: string) =>
    new Date(utcDate).toLocaleDateString();

  return (
    <div className={styles.list}>
      {articles.map((article) => (
        <Link
          className={styles.list__item}
          to={article.objectID}
          key={article.objectID}
        >
          <Text>{formatDate(article.created_at)}</Text>
          <Heading as="h3" size="lg">
            {article.title}
          </Heading>
          <Heading as="h4" size="md">
            {article.author}
          </Heading>
          <div className={styles.icon_group}>
            <span>
              <ChatIcon />
              {article.num_comments}
            </span>
            <span>
              <StarIcon />
              {article.points}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

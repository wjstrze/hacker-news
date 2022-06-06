import { useEffect } from "react";
import { ChatIcon, StarIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { selectArticles, fetchArticles } from "../../slice/articles-slice";
import {
  useArticlesSelector,
  useArticlesDispatch,
} from "../../hooks/articles-hooks";

import styles from "./ArticlesList.module.scss";

export const LoadMore = () => {
  //   const articles = useArticlesSelector(selectArticles);
  //   const dispatch = useArticlesDispatch();

  //   useEffect(() => {
  //     dispatch(fetchArticles());
  //   }, [dispatch]);

  return <Button type="button">load more</Button>;
};

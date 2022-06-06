import { useEffect } from "react";
import { selectArticles, fetchArticles } from "../../slice/articles-slice";
import {
  useArticlesSelector,
  useArticlesDispatch,
} from "../../hooks/articles-hooks";

export const ArticlesList = () => {
  const articles = useArticlesSelector(selectArticles);
  const dispatch = useArticlesDispatch();

  useEffect(() => {
    dispatch(fetchArticles());
  }, []);

  return <div>list</div>;
};

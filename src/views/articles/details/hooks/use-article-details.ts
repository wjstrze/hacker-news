import { useState, useMemo, useEffect, useCallback } from "react";
import { Item, ItemService } from "../../../../services";

export interface ArticleDetailsReturnType {
  article: Item | undefined;
  isLoading: boolean;
}

export const useArticleDetails = (
  articleId: Item["id"]
): ArticleDetailsReturnType => {
  const itemService = useMemo(() => new ItemService(), []);
  const [article, setArticle] = useState<Item | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchArticle = useCallback(async () => {
    setIsLoading(true);
    try {
      const article = await itemService.item(articleId);
      setArticle(article);
    } catch (error) {
      //TODO: handle api error
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [itemService, articleId]);

  useEffect(() => {
    fetchArticle();
  }, [fetchArticle]);

  return {
    article,
    isLoading,
  };
};

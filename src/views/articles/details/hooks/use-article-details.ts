import { useState, useMemo, useEffect, useCallback } from "react";
import { Item, ItemsService } from "../../../../services";

export interface ArticleDetailsReturnType {
  article: Item | undefined;
  isLoading: boolean;
}

export const useArticleDetails = (
  articleId: Item["id"]
): ArticleDetailsReturnType => {
  const itemsService = useMemo(() => new ItemsService(), []);
  const [article, setArticle] = useState<Item | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchArticle = useCallback(async () => {
    setIsLoading(true);
    try {
      const article = await itemsService.item(articleId);
      setArticle(article);
    } catch (error) {
      //TODO: handle api error
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [itemsService, articleId]);

  useEffect(() => {
    fetchArticle();
  }, [fetchArticle]);

  return {
    article,
    isLoading,
  };
};

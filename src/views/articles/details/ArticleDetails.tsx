import { useParams } from "react-router-dom";
import { Item } from "../../../services";
import { useArticleDetails } from "./hooks/use-article-details";

export const ArticlesDetails = () => {
  const { articleId } = useParams();

  if (articleId === undefined || parseInt(articleId) === undefined) {
    return <div>not found</div>;
  }

  return <Details articleId={parseInt(articleId)} />;
};

interface DetailsProps {
  articleId: Item["id"];
}

const Details = ({ articleId }: DetailsProps) => {
  const { article, isLoading } = useArticleDetails(articleId);

  if (isLoading || article === undefined) {
    return <div>Loading</div>;
  }

  return <div>{JSON.stringify(article)}</div>;
};

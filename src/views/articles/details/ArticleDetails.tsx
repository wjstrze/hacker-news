import { useParams, Link } from "react-router-dom";
import { Heading, Text, Link as ChakraLink, Button } from "@chakra-ui/react";

import { formatDate } from "../../../utils";
import { Item } from "../../../services";

import { useArticleDetails } from "./hooks/use-article-details";
import styles from "./ArticleDetails.module.scss";

export const ArticlesDetails = () => {
  const { articleId } = useParams();

  if (articleId === undefined || isNaN(parseInt(articleId))) {
    return <div>not found</div>;
  }
  return (
    <div className={styles.container}>
      <Details articleId={parseInt(articleId)} />
    </div>
  );
};

interface DetailsProps {
  articleId: Item["id"];
}

const Details = ({ articleId }: DetailsProps) => {
  const { article, isLoading } = useArticleDetails(articleId);

  if (isLoading || article === undefined) {
    return <div>Loading</div>;
  }

  return (
    <div className={styles.article}>
      <Link to="/articles">
        <Button type="button">Back to the list</Button>
      </Link>
      <Text>{formatDate(article.created_at)}</Text>
      <Heading as="h3" size="lg">
        {article.title}
      </Heading>
      <Heading as="h4" size="md">
        {article.author}
      </Heading>
      <ChakraLink href={article.url} target="_blank">
        {article.url}
      </ChakraLink>
    </div>
  );
};

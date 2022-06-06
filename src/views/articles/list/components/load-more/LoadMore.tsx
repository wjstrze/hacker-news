import { Button } from "@chakra-ui/react";
import { incrementPage } from "../../slice/articles-slice";
import { useArticlesDispatch } from "../../hooks/articles-hooks";

export const LoadMore = () => {
  const dispatch = useArticlesDispatch();

  const handleClick = () => {
    dispatch(incrementPage());
  };

  return (
    <Button type="button" onClick={handleClick}>
      Load more
    </Button>
  );
};

import { ChangeEvent, FormEvent, useState } from "react";
import { Input } from "@chakra-ui/react";
import { updateSearch } from "../../slice/articles-slice";
import { useArticlesDispatch } from "../../hooks/articles-hooks";

export const SearchInput = () => {
  const [search, setSearch] = useState<string>("");
  const dispatch = useArticlesDispatch();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(updateSearch(search));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        onChange={handleChange}
        value={search}
        placeholder="search articles..."
      />
      <button type="submit" hidden />
    </form>
  );
};

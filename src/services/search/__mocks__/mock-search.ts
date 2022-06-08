import { Search } from "../types";

export const MOCK_SEARCH: Search = {
  hits: [
    {
      created_at: "11",
      title: "Y Combinator",
      url: "http://ycombinator.com",
      author: "pg",
      points: 57,
      num_comments: 2,
      objectID: "1",
    },
  ],
  page: 0,
  nbHits: 11,
  nbPages: 1,
  hitsPerPage: 20,
  processingTimeMS: 1,
  query: "pg",
  params: "query=pg",
};

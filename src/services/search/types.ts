export type SearchQueryParams = {
  query?: string;
  page?: number;
  hitsPerPage?: number;
};

export interface Search {
  hits: Hit[];
  page: number;
  nbHits: number;
  nbPages: number;
  hitsPerPage: number;
  processingTimeMS: number;
  query: string;
  params: string;
}

export interface Hit {
  title: string;
  url: string;
  author: string;
  points: number;
  num_comments: number;
  objectID: string;
}

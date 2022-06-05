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
  story_text: null;
  comment_text: null;
  _tags: string[];
  num_comments: number;
  objectID: string;
  _highlightResult: HighlightResult;
}

export interface HighlightResult {
  title: Author;
  url: Author;
  author: Author;
}

export interface Author {
  value: string;
  matchLevel: string;
  matchedWords: string[];
}

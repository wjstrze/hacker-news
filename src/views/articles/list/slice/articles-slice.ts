import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ArticlesState } from "../store/articles-store";
import { SearchService, Hit, Search } from "../../../../services";

interface ArticleState {
  list: Hit[];
  page: number;
  search: string;
  perPage: number;
  status: "idle" | "loading";
  metaData?: Search;
}

const initialState: ArticleState = {
  list: [],
  status: "idle",
  page: 0,
  perPage: 20,
  search: "",
  metaData: undefined,
};

export type FetchArticles = Pick<ArticleState, "page" | "perPage" | "search">;

export const fetchArticles = createAsyncThunk<
  Search | undefined,
  FetchArticles,
  { state: { articles: ArticleState } }
>("articles/fetchArticles", async (params: FetchArticles, { getState }) => {
  const { articles } = getState();

  if (articles.metaData?.page === params.page) {
    return undefined;
  }

  const searchService = new SearchService();
  const data = await searchService.search({
    page: params.page,
    hitsPerPage: params.perPage,
    query: params.search,
  });

  return data;
});

export const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    incrementPage: (state) => {
      state.page += 1;
    },
    updateSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.page = 0;
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = "idle";
        if (action.payload) {
          state.metaData = action.payload;
          state.list = state.list.concat(action.payload.hits);
        }
      });
  },
});

export const { incrementPage, updateSearch } = articlesSlice.actions;

export const selectArticles = (state: ArticlesState) => state.articles.list;
export const selectPage = (state: ArticlesState) => state.articles.page;
export const selectPerPage = (state: ArticlesState) => state.articles.perPage;
export const selectSearch = (state: ArticlesState) => state.articles.search;

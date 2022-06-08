import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ArticlesState } from "../store/articles-store";
import { SearchService, Hit, Search } from "../../../../services";

export interface ArticleState {
  list: Hit[];
  page: number;
  search: string;
  perPage: number;
  status: "idle" | "loading";
  metadata?: Search;
}

const initialState: ArticleState = {
  list: [],
  status: "idle",
  page: 0,
  perPage: 20,
  search: "",
  metadata: undefined,
};

export type FetchArticles = Pick<ArticleState, "page" | "perPage" | "search">;

export const fetchArticles = createAsyncThunk<Search, FetchArticles>(
  "articles/fetchArticles",
  async (params: FetchArticles) => {
    const searchService = new SearchService();
    const data = await searchService.search({
      page: params.page,
      hitsPerPage: params.perPage,
      query: params.search,
    });

    return data;
  }
);

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
        state.metadata = action.payload;
        state.list = state.list.concat(action.payload.hits);
      });
  },
});

export const { incrementPage, updateSearch } = articlesSlice.actions;

export const selectArticles = (state: ArticlesState) => state.articles.list;
export const selectPage = (state: ArticlesState) => state.articles.page;
export const selectPerPage = (state: ArticlesState) => state.articles.perPage;
export const selectSearch = (state: ArticlesState) => state.articles.search;
export const selectMetadata = (state: ArticlesState) => state.articles.metadata;

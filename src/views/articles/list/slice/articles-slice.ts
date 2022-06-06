import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ArticlesState } from "../store/articles-store";
import { SearchService, Hit } from "../../../../services";

interface ArticleState {
  list: Hit[];
  status: "idle" | "loading";
}

const initialState: ArticleState = {
  list: [],
  status: "idle",
};

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async () => {
    const searchService = new SearchService();
    const data = await searchService.search();

    return data.hits;
  }
);

export const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = "idle";
        state.list = action.payload;
      });
  },
});

export const selectArticles = (state: ArticlesState) => state.articles.list;

import { configureStore } from "@reduxjs/toolkit";
import { articlesSlice } from "../slice/articles-slice";

export const articlesStore = configureStore({
  reducer: {
    articles: articlesSlice.reducer,
  },
});

export type ArticlesDispatch = typeof articlesStore.dispatch;
export type ArticlesState = ReturnType<typeof articlesStore.getState>;

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { ArticlesState, ArticlesDispatch } from "../store/articles-store";

export const useArticlesDispatch = () => useDispatch<ArticlesDispatch>();
export const useArticlesSelector: TypedUseSelectorHook<ArticlesState> =
  useSelector;

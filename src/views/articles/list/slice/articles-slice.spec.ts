import { SearchService, MOCK_SEARCH } from "../../../../services";

import {
  fetchArticles,
  articlesSlice,
  incrementPage,
  updateSearch,
  ArticleState,
  FetchArticles,
} from "./articles-slice";

jest.mock("@reduxjs/toolkit/src/createAsyncThunk");
jest.mock("../../../../services/search/search.service.ts");

describe("articles reducer", () => {
  it("should handle initial state", () => {
    expect(articlesSlice.reducer(undefined, { type: "unknown" })).toEqual({
      list: [],
      status: "idle",
      page: 0,
      perPage: 20,
      search: "",
      metadata: undefined,
    });
  });
  it("should handle increment page", () => {
    const actual = articlesSlice.reducer(undefined, incrementPage());
    expect(actual.page).toEqual(1);
  });

  describe("update search", () => {
    let actual: ArticleState;
    beforeEach(() => {
      const initialState: ArticleState = {
        list: [],
        status: "idle",
        page: 1,
        perPage: 20,
        search: "",
        metadata: undefined,
      };

      actual = articlesSlice.reducer(initialState, updateSearch("asd"));
    });

    it("should reset page value", () => {
      expect(actual.page).toEqual(0);
    });

    it("should reset list value", () => {
      expect(actual.list).toEqual([]);
    });

    it("sets search value", () => {
      expect(actual.search).toEqual("asd");
    });
  });

  describe("fetch articles", () => {
    const params: FetchArticles = {
      page: 1,
      perPage: 10,
      search: "test",
    };
    const mockSearch = jest.fn(() => MOCK_SEARCH);

    beforeAll(() => {
      (SearchService as jest.Mock).mockImplementation(() => ({
        search: mockSearch,
      }));
    });

    it("should call api service with transformed params", async () => {
      await fetchArticles(params)(jest.fn(), jest.fn(), {});

      expect(mockSearch).toHaveBeenCalledWith({
        page: 1,
        hitsPerPage: 10,
        query: "test",
      });
    });
    it("should returns api data", async () => {
      const data = await fetchArticles(params)(jest.fn(), jest.fn(), {});

      expect(data.payload).toEqual(
        expect.objectContaining({
          page: 0,
          hits: expect.any(Array),
        })
      );
    });
  });
});

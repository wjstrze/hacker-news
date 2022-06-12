import axios from "axios";
import { SearchService } from "./search.service";
import { SearchQueryParams } from "./types";
import { MOCK_SEARCH } from "./mock-data/mock-search";

jest.mock("axios");

const prepareApiAndMock = (status = 200, data: unknown = undefined) => {
  const mockGet = jest.fn().mockImplementation(() => {
    if (status >= 300) {
      return Promise.reject({
        code: status,
      });
    }

    return Promise.resolve({
      data,
      status,
    });
  });

  (axios.create as jest.Mock).mockImplementation(() => ({
    get: mockGet,
  }));

  return {
    searchService: new SearchService(),
    mockGet,
  };
};

describe("Search Service", () => {
  describe("search action", () => {
    it("calls api", async () => {
      const PARAMS: SearchQueryParams = {
        hitsPerPage: 10,
        page: 1,
        query: "sample article",
      };

      const { mockGet, searchService } = prepareApiAndMock(200, MOCK_SEARCH);
      await searchService.search(PARAMS);
      expect(mockGet).toHaveBeenCalledWith("search", { params: PARAMS });
    });

    it("returns search data", async () => {
      const { searchService } = prepareApiAndMock(200, MOCK_SEARCH);
      const result = await searchService.search();
      expect(result).toStrictEqual(MOCK_SEARCH);
    });

    it("rejects on error", async () => {
      const { searchService } = prepareApiAndMock(404);
      await expect(searchService.search()).rejects.toEqual({ code: 404 });
    });
  });
});

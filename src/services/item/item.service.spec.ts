import { HackerNewsAPI } from "../hacker-news-api/hacker-news-api";
import { ItemService } from "./item.service";
import { Item } from "./types";

jest.mock("../hacker-news-api/hacker-news-api.ts");

const MOCK_ITEM: Item = {
  id: 5,
  author: "Jhon Doe",
  text: "content",
  points: 1000,
  created_at: "2022-06-06T19:49:40Z",
};

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

  (HackerNewsAPI as jest.Mock).mockImplementation(() => ({
    hackerNewsAPI: {
      get: mockGet,
    },
  }));
  return {
    itemService: new ItemService(),
    mockGet,
  };
};

describe.skip("Item Service", () => {
  describe("get item", () => {
    const mockResponse = {
      data: MOCK_ITEM,
    };
    it("calls api", async () => {
      const { mockGet, itemService } = prepareApiAndMock(200, mockResponse);
      await itemService.item(42);
      expect(mockGet).toHaveBeenCalledWith("items/42");
    });

    it("returns item data", async () => {
      const { itemService } = prepareApiAndMock(200, mockResponse);
      const result = await itemService.item(42);
      expect(result).toStrictEqual(MOCK_ITEM);
    });

    it("rejects on error", async () => {
      const { itemService } = prepareApiAndMock(404);
      await expect(itemService.item(42)).rejects.toEqual({ code: 404 });
    });
  });
});

import {
  renderHook,
  RenderHookResult,
  act,
} from "@testing-library/react-hooks";
import { Item, ItemService } from "../../../../services";
import {
  useArticleDetails,
  ArticleDetailsReturnType,
} from "./use-article-details";

const MOCK_ARTICLE: Item = {
  id: 5,
  author: "Jhon Doe",
  text: "content",
  points: 1000,
  created_at: "2022-06-06T19:49:40Z",
};

const mockItem = jest.fn<Promise<Item>, [Item["id"]]>(() =>
  Promise.resolve(MOCK_ARTICLE)
);

jest.mock("../../../../services/item/item.service", () => ({
  ItemService: jest.fn().mockImplementation(() => ({
    item: mockItem,
  })),
}));

// react testing library hooks doesn't support react v18
describe.skip("use article hook", () => {
  let renderedHook: RenderHookResult<Item["id"], ArticleDetailsReturnType>;
  const articleId: Item["id"] = 5;

  beforeAll(() => {
    (ItemService as jest.Mock).mockImplementation(() => ({
      item: mockItem,
    }));
  });

  beforeEach(async () => {
    await act(async () => {
      renderedHook = renderHook<Item["id"], ArticleDetailsReturnType>(() =>
        useArticleDetails(articleId)
      );
    });
  });

  it("calls item method from ItemsService with given item id", () => {
    expect(mockItem).toHaveBeenCalledWith(articleId);
  });

  it("returns article", () => {
    expect(renderedHook.result.current.article).toStrictEqual(MOCK_ARTICLE);
  });
});

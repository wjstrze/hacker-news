import { HackerNewsAPI } from "../hacker-news-api/hacker-news-api";
import { Item } from "./types";

export class ItemService extends HackerNewsAPI {
  public async item(id: Item["id"]): Promise<Item> {
    const response = await this.hackerNewsAPI.get<Item>(`items/${id}`);
    return response.data;
  }
}

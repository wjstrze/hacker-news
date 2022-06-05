import { HackerNewsAPI } from "../hacker-news-api/hacker-news-api";
import { Search, SearchQueryParams } from "./types";

export class ArticlesService extends HackerNewsAPI {
  public async search(params?: SearchQueryParams): Promise<Search> {
    const response = await this.hackerNewsAPI.get<Search>("search", {
      params,
    });
    return response.data;
  }
}

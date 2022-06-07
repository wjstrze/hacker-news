import { HackerNewsAPI } from "./hacker-news-api";

class ExampleHackerNewsApiClass extends HackerNewsAPI {}

describe("Hacker News API", () => {
  it("has base URL defined", () => {
    const example = new ExampleHackerNewsApiClass();
    expect(example.hackerNewsAPI.defaults.baseURL).toBe(
      "https://hn.algolia.com/api/v1/"
    );
  });
});

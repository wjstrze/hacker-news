import axios, { AxiosInstance } from "axios";

export abstract class HackerNewsAPI {
  public hackerNewsAPI: AxiosInstance;
  constructor() {
    this.hackerNewsAPI = axios.create({
      baseURL: "https://hn.algolia.com/api/v1/",
    });
  }
}

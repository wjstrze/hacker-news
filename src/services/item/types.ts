export interface Item {
  id: number;
  created_at: string;
  author: string;
  title?: string;
  url?: string;
  text: null | string;
  points: number;
}

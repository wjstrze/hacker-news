export interface Item {
  id: number;
  created_at: Date;
  author: string;
  title?: string;
  url?: string;
  text: null | string;
  points: number;
  parent_id: number | null;
  children: Item[];
}

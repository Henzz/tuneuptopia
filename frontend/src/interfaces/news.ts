export interface News {
  _id?: string;
  title: string;
  content: string;
  author: string;
  publishedDate: string;
  isPublished: boolean | string | number;
}

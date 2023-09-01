import {Category} from "./category";

export interface Post {
  id: Number;
  title: string;
  permalink: String;
  excerpt: String;
  postContent: String;
  category: Category;
  imgPath: String;
}

export type tagType = "Signalement" | "Intervention";

export type postDataType = {
  id: number
  author: string;
  creationDate: Date;
  postContent: string;
  tags: tagType[];
};

export type userType = {
  name:string;
  avatar:string
}
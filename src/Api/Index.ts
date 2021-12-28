import { postDataType, userType } from "./Types";
import avatar1 from "../asset/1.jpg";
import avatar2 from "../asset/2.jpg";
import avatar3 from "../asset/3.jpg";


const BASE_URL = "http://localhost:8000";

// Service pour ajouter une nouvelle poste
// Omit elimine un element de l'interface / type
export const submitPostData = async (
  post: Omit<postDataType,"id">
): Promise<boolean> => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  };
  return fetch(BASE_URL + "/posts", requestOptions).then((response) => {
    if (!response.ok) {
      return false;
    }
    return true;
  });
};


export const getAllPostData = async (): Promise<postDataType[]> => {
  return fetch(BASE_URL + "/posts").then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json() as Promise<postDataType[]>;
  });
};

export const deletePostById = async (id: number): Promise<boolean> => {
  return fetch(BASE_URL + "/posts/" + id.toString(), {
    method: "DELETE",
  }).then((response) => {
    if (!response.ok) {
      return false;
    }
    return true;
  });
};

export const updatePost = async (data: postDataType): Promise<boolean> => {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  return fetch(BASE_URL + "/posts/" + data.id.toString(), requestOptions).then(
    (response) => {
      if (!response.ok) {
        return false;
      }
      return true;
    }
  );
};

export const USERS: userType[] = [
  { name: "John", avatar: avatar1 },
  { name: "Smith", avatar: avatar2 },
  { name: "Nourhene", avatar: avatar3 },
];

export const getAvatar = (userName: string): string => {
  const avatar = USERS.find((user) => user.name === userName)?.avatar;
  return avatar ? avatar : "";
};

export const getRandomUserName = (): string => {
  return USERS[Math.floor(Math.random() * USERS.length)].name;
};

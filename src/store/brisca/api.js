import { get, post, url } from "../../lib/accio";

export const GetList = (page = 1) => {
  return get(url(`/_briscas/query?page=${page}`));
};
export const GetById = id => {
  return get(url(`/_briscas/query/${id}`));
};
export const PostNewGame = token => {
  return post(url("/_briscas/new"), { access_token: token });
};
export const PostPublicGame = token => {
  return post(url("/_briscas/public"), { access_token: token });
};
export const PostJoinGame = (token, id) => {
  return post(url(`/_briscas/join/${id}`), { access_token: token });
};
export const PostPlayCard = (token, id, card) => {
  return post(url(`/_briscas/card/${id}`), { card: card, access_token: token });
};
export const PostRequestBot = (token, id, card) => {
  return post(url(`/_briscas/bot/${id}`), { access_token: token });
};

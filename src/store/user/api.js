import { get, put, url } from "../../lib/accio";

export const getOne = id => {
  return get(url(`/_auth/user/query/${id}`));
};
export const save = (token, data) => {
  return put(url(`/_briscas/member/data`), {
    access_token: token,
    data
  });
};

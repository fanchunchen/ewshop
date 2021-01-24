import request from "./request";
// export const register = (name, password, password_confirmation, email) => {
//   let data = { name, password, password_confirmation, email };
//   return request({
//     url: "/api/auth/register",
//     method: "post",
//     data
//   });
// };
export const register = data => {
  return request({
    url: "/api/auth/register",
    method: "post",
    data
  });
};
export const login = data => {
  return request({
    url: "/api/auth/login",
    method: "post",
    data
  });
};
export const loginOut = () => {
  return request({
    url: "/api/auth/logout",
    method: "post"
  });
};

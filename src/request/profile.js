import request from "./request";
export const getProfileData = () => {
  return request({
    url: "/api/user"
  });
};

import request from "./request";
export const getHomeData = () => {
  return request({
    url: "/api/index"
  });
};
export const getHomeGoods = (type, page) => {
  return request({
    url: "/api/index?" + type + "=1&page=" + page
  });
};

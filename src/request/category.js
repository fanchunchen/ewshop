import request from "./request";
export const getCategory = () => {
  return request({
    url: "/api/goods"
  });
};
export const getCategoryGoods = (cid, page, type) => {
  return request({
    url: "/api/goods?category_id=" + cid + "&page=" + page + "&" + type + "=1"
  });
};

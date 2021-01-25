import request from "./request";
export const AddToCart = (goods_id, num) => {
  return request({
    url: "/api/carts",
    method: "post",
    data: { goods_id, num }
  });
};
export const cartList = data => {
  return request({
    url: "/api/carts?" + data
  });
};
export const cartChange = (id, num) => {
  return request({
    url: `/api/carts/${id}`,
    method: "put",
    data: { num }
  });
};
export const deleteCart = id => {
  return request({
    url: `/api/carts/${id}`,
    method: "delete"
  });
};
export const isChecked = cart_ids => {
  return request({
    url: `/api/carts/checked`,
    method: "patch",
    data: { cart_ids }
  });
};

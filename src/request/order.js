import request from "./request";
// 订单预览
export const getOrderPreview = () => {
  return request({
    url: "/api/orders/preview"
  });
};
// 提交订单
export const commitOrder = address_id => {
  return request({
    url: "/api/orders",
    method: "post",
    data: { address_id }
  });
};
// 订单详情;
export const getOrderDetail = (id, params) => {
  return request({
    url: `/api/orders/${id}` + params
  });
};
// 订单列表
export const getOrderList = params => {
  return request({
    url: "/api/orders",
    params
  });
};
export const payOrder = (id, type) => {
  return request({
    url: `/api/orders/${id}/pay` + type
  });
};
export const orderStatus = id => {
  return request({
    url: `/api/orders/${id}/status`
  });
};

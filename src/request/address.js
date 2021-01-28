import request from "./request";
export const getAddressData = () => {
  return request({
    url: "/api/address"
  });
};
export const addAddress = data => {
  return request({
    url: "/api/address",
    method: "post",
    data
  });
};
export const addressDetail = id => {
  return request({
    url: `/api/address/${id}`
  });
};
export const updateAddress = (id, data) => {
  return request({
    url: `/api/address/${id}`,
    method: "put",
    data
  });
};
export const deleteAddress = id => {
  return request({
    url: `/api/address/${id}`,
    method: "delete"
  });
};

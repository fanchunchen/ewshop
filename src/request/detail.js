import request from "./request";
export const getDetailData = id => {
  return request({
    // url: "/api/goods/" + id
    url: `/api/goods/${id}`
  });
};

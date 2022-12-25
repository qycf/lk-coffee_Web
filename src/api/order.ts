import http from "@/utils/http";

export const putUserOrder = (data: object) => {
  return http.request({
    url: "/user/order",
    method: "PUT",
    data,
  });
};  


export const getUserOrder = () => {
  return http.request({
    url: "/user/order",
    method: "GET",
  });
}

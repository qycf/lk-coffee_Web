import http from "@/utils/http";

export const putUserOrder = (data: object) => {
  return http.request({
    url: "/user/order",
    method: "PUT",
    data,
  });
};


export const getUserOrder = (status?: number) => {
  let url = "/user/order/list/" + status
  if (status == undefined) {
    url = "/user/order/list"
  }
  return http.request({
    url,
    method: "GET",
  });
}

export const setUserOrderDone = (id: string) => {
  return http.request({
    url: "/user/order/" + id,
    method: "POST",
  });
}

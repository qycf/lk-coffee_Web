import http from "@/utils/http";

export const getUserAddress = () => {
  return http.request({
    url: "/user/address",
    method: "GET",
  });
};

export const savaOrUpdateAddress = (data: object) => {
  return http.request({
    url: "/user/address",
    method: "POST",
    data,
  });
};

export const getAddressByid = (address_id: number) => {
  return http.request({
    url: "/user/address/"+address_id,
    method: "GET",
  });
};

export const deleteAddressByid = (address_id: number) => {
  return http.request({
    url: "/user/address/"+address_id,
    method: "DELETE",
  });
};

export const setDefaultAddress = (address_id: number) => {
  return http.request({
    url: "/user/address/default/"+address_id,
    method: "POST",
  });
};

import http from "@/utils/http";

export const getMenuList = () => {
  return http.request({
    url: "/menu",
    method: "GET",
  });
};

export const addMenu = (data: any) => {
  return http.request({
    url: "/menu",
    method: "POST",
    data,
  });
};

export const deleteMenuById = (menu_id: number) => {
  return http.request({
    url: "/menu/"+menu_id,
    method: "DELETE",
  });
};

import http from "@/utils/http";

export const getGoodsListByMenuId = (menu_id: number | null) => {
  let url = "/goods/menu/" + menu_id;
  if (menu_id === null) {
    url = "/goods/menu/";
  }
  return http.request({
    url,
    method: "GET",
  });
};

export const addLike = (data: object) => {
  return http.request({
    url: "/user/like",
    method: "POST",
    data,
  });
};

// 喜欢的id
export const getGoodsLike = () => {
  return http.request({
    url: "/user/like",
    method: "GET",
  });
};
// 我的喜欢
export const getUserLike = () => {
  return http.request({
    url: "/user/like/",
    method: "GET",
  });
};

export const goodsEdit = (data: any) => {
  return http.request({
    url: "/goods",
    method: "POST",
    data,
  });
};

export const goodsDelete = (id: number) => {
  return http.request({
    url: "/goods/" + id,
    method: "DELETE",
  });
}

export const getGoodsByKeyword = (keyword: string) => {
  return http.request({
    url: "/goods/",
    method: "GET",
    params: {
      keyword,
    },
  });
};

export const getGoodsByRandom = () => {
  return http.request({
    url: "/goods/random",
    method: "GET",
  });
};

export const getGoodsById = (id: number) => {
  return http.request({
    url: "/goods/" + id,
    method: "GET",
  });
}

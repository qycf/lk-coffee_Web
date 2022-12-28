import http from "@/utils/http";

export const loginWithTel = (data: object) => {
  return http.request({
    url: "/user/login/tel",
    method: "POST",
    data,
  });
};

export const login = (data: object) => {
  return http.request({
    url: "/lkcoffee/user",
    method: "POST",
    data,
  });
};

export const register = (data: object) => {
  return http.request({
    url: "/user",
    method: "PUT",
    data,
  });
}

export const logout = () => {
  return http.request({
    url: "/user/logout",
    method: "POST",
  });
};

export const loginWithPw = (data: object) => {
  return http.request({
    url: "/user/login/pw",
    method: "POST",
    data,
  });
};


export const updateProfile = (value: string, type: string) => {
  return http.request({
    url: "/user/update/" + type,
    method: "POST",
    params: {
      value
    }
  });
}
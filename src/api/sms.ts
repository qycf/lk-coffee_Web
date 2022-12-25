import http from "@/utils/http";

export const sendRegisterCode = (phone_number:string) => {
  return http.request({
    url: "/sms/register/"+phone_number,
    method: "POST",
  });
};


export const sendLoginCode = (phone_number:string) => {
  return http.request({
    url: "/sms/login/"+phone_number,
    method: "POST",
  });
};
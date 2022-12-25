import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      user_info: {} as userInfo,
      token: "",
      user_address: [] as address[],
      default_address: {} as address,
    };
  },
  actions: {
    setUser(token: string, userInfo: userInfo) {
      this.token = token;
      this.user_info = userInfo;
    },
    setToken(token: string) {
      this.token = token;
    },
    setDataEmpty() {
      this.user_info = {} as userInfo;
      this.token = "";
    },
    setAddress(addressList: address[], default_address: address) {
      this.user_address = addressList;
      this.default_address = default_address;
    },
    cancelDefaultAddress(oldDefaultAddress: address) {
      oldDefaultAddress.isDefault = false;
      this.user_address.push(oldDefaultAddress);
    },
  },
  persist: [
    { paths: ["token", "user_info"], storage: localStorage },
    { paths: ["user_address", "default_address"], storage: sessionStorage },
  ],
});

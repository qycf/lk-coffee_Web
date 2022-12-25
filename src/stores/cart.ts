import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => {
    return {
      cart_list: [] as GoodsInfo[],
    };
  },
  actions: {
    addCart(goods: any) {
      this.cart_list.push(goods);
    },
  },
  persist: {
    storage: sessionStorage,
  },
});

interface GoodsInfo {
  id: number;
  name: string;
  thumb: string;
  price: number;
  cup: string;
  temperature: string;
  sugar: string;
  count: number;
  origin_price: number;
}

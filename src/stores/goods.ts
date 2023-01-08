import { defineStore } from "pinia";

export const useGoodsStore = defineStore("goods", {
  state: () => {
    return {
      goods_list: {} as goodsList,
      goods_like: [] as goodsLike[]
    };
  },
  actions: {
    setGoodsList(goods_list: goodsList) {
      this.goods_list = goods_list;
    },
    setGoodsLike(goods_like: goodsLike[]) {
      this.goods_like = goods_like;
    }
  },
  persist: {
    storage: sessionStorage,
  },
});

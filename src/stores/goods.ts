import { defineStore } from "pinia";

export const useGoodsStore = defineStore("goods", {
  state: () => {
    return {
      id: -1,
      thumb: "",
      detail:'',
      goods: {} as goods,
      goods_list: {} as goodsList,
      goods_like: [] as goodsLike[]
    };
  },
  actions: {
    setGoods(goods: goods) {
      this.goods = goods;
    },
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

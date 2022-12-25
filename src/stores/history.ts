import { defineStore } from "pinia";

export const usehistoryStore = defineStore("history", {
  state: () => {
    return {
      keyword: [] as keyword[],
    };
  },
  actions: {
    addKeyword(keyword: keyword) {
      this.keyword.unshift(keyword);
    },
    clearKeyword(keyword: keyword) {
      this.keyword = this.keyword.filter((item) => item.name !== keyword.name);
    }
  },
  persist: {
    storage: sessionStorage,
  },
});

interface keyword {
  name: string;
  isShow: boolean;
}

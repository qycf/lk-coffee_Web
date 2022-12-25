import { defineStore } from "pinia";

export const useMenuStore = defineStore("menu", {
  state: () => {
    return {
      menu_list: [] as menu[],
      activeMenu: 1,
    };
  },
  actions: {
    setMenuList(menu_list: menu[]) {
      this.menu_list = menu_list;
    },
  },
  persist: {
    storage: sessionStorage,
  },
});

interface menu {
  id: number;
  title: string;
  path: string;
}

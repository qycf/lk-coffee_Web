import { defineStore } from "pinia";

export const useAddressStore = defineStore("address", {
  state: () => {
    return {
      user_address: [] as address[],
      select_address: {
        addressDetail: "",
        id: 0,
      },
    };
  },
  actions: {
    setAddress(addressList: address[]) {
      this.user_address = addressList;
    },
    deleteAddress(address_id: number) {
      this.user_address = this.user_address.filter(
        (address) => address.id !== address_id
      );
    },
    cancelDefaultAddress(oldDefaultAddress: address) {
      oldDefaultAddress.isDefault = false;
      this.user_address.push(oldDefaultAddress);
    },
    setDataEmpty() {
      this.user_address = [];
      this.select_address = {
        addressDetail: "",
        id: 0,
      };
    }
  },
  persist: [
    {
      paths: ["user_address"],
      storage: sessionStorage,
    },
  ],
});

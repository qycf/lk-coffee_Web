import { defineStore } from "pinia";

export const useAddressStore = defineStore("address", {
  state: () => {
    return {
      user_address: [] as address[],
      default_address: {} as address,
      select_address: {
        addressDetail: "",
        id: 0,
      },
    };
  },
  actions: {
    setAddress(addressList: address[], default_address: address) {
      this.user_address = addressList;
      this.default_address = default_address;
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
  },
  persist: [
    {
      paths: ["user_address", "default_address"],
      storage: sessionStorage,
    },
  ],
});

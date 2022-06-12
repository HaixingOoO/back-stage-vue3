import { defineStore } from "pinia";

export const useStore = defineStore("store", {
  state() {
    return {
      isLogin: false,
    };
  },
  actions: {
    toggleLogin: function () {
      this.isLogin = !this.isLogin;
    },
  },
});

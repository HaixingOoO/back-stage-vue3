import { defineStore } from "pinia";
import { getSession } from "../utils";

export const useStore = defineStore("store", {
  state() {
    return {
      isLogin: getSession("login") || false,
    };
  },
  actions: {
    toggleLogin: function (bol: boolean) {
      this.isLogin = bol;
    },
  },
});

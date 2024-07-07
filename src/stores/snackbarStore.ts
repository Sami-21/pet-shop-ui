import { SnackbarState } from "@/types/snackbarState.type";
import { defineStore } from "pinia";

export const useSnackbarStore = defineStore("SnackbarStore", {
  state: (): SnackbarState => {
    return {
      isVisible: false,
      message: "",
      color: "",
    };
  },

  getters: {
    getVisibility: (state) => state.isVisible,
    getMessage: (state) => state.message,
    getColor: (state) => state.color,
  },

  actions: {
    reset() {
      this.isVisible = false;
      this.message = "";
      this.color = "";
    },

    setIsVisible(isVisible: boolean) {
      this.isVisible = isVisible;
    },

    setMessage(message: string) {
      this.message = message;
    },

    setColor(color: string) {
      this.color = color;
    },

    setState(isVisible: boolean, message: string, color: string) {
      this.isVisible = isVisible;
      this.message = message;
      this.color = color;
    },
  },
});

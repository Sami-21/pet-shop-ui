import { AuthState } from "@/types/authState.type";
import { CreateUserData } from "@/types/createUserData.type";
import axios from "axios";
import { defineStore } from "pinia";
import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();

export const useAuthStore = defineStore("AuthStore", {
  state: (): AuthState => {
    return {
      user: cookies.get("user") ? cookies.get("user") : {},
      token: cookies.get("token") ? cookies.get("token") : "",
      error: null,
      errors: [],
      isLoading: false,
    };
  },

  getters: {
    getUser: (state) => state.user,
    getToken: (state) => state.token,
  },

  actions: {
    reset() {
      this.user = {};
      this.token = "";
      this.error = null;
      this.errors = [];
      this.isLoading = false;
    },

    resetErrors() {
      this.error = null;
      this.errors = [];
    },

    async login(email: string, password: string) {
      try {
        this.isLoading = true;
        this.resetErrors();
        const { data } = await axios.post(
          import.meta.env.VITE_API_URL + "/user/login",
          {
            email,
            password,
          }
        );

        this.token = data.data.token;
        this.isLoading = false;
        cookies.set("token", data.data.token);

        return data;
      } catch (error) {
        this.error = error.response.data.error;
        this.errors = error.response.data.errors;
        this.isLoading = false;

        throw error;
      }
    },

    async create(createUserData: CreateUserData) {
      try {
        this.isLoading = true;
        this.resetErrors();
        const { data } = await axios.post(
          import.meta.env.VITE_API_URL + "/user/create",
          { ...createUserData }
        );

        this.token = data.token;
        this.isLoading = false;
      } catch (error) {
        this.error = error.response.data.error;
        this.errors = error.response.data.errors;
        this.isLoading = false;

        throw error;
      }
    },

    async getUser() {
      try {
        this.isLoading = true;
        this.resetErrors();
        const { data } = await axios.get(
          import.meta.env.VITE_API_URL + "/user",
          {
            headers: {
              Authorization: "Bearer " + this.token,
            },
          }
        );

        this.token = data.token;
        this.isLoading = false;
      } catch (error) {
        this.error = error.response.data.error;
        this.errors = error.response.data.errors;
        this.isLoading = false;

        throw error;
      }
    },
  },
});

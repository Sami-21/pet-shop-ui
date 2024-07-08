/**
 * @fileoverview Description of file. This file defines authentication store
 */

import { AuthState } from "@/types/authState.type";
import { CreateUserData } from "@/types/createUserData.type";
import axios from "axios";
import { defineStore } from "pinia";
import { useCookies } from "vue3-cookies";
import { useSnackbarStore } from "./snackbarStore";
import { User } from "@/types/user.type";

const { cookies } = useCookies();

export const useAuthStore = defineStore("AuthStore", {
  state: (): AuthState => {
    return {
      user: cookies.get("user") ? cookies.get("user") : null,
      token: cookies.get("token") ? cookies.get("token") : "",
      orders: [],
      totalOrders: 0,
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
      this.user = null;
      this.token = "";
      this.error = null;
      this.errors = [];
      this.isLoading = false;
    },

    resetCookies() {
      cookies.set("token", "");
      cookies.set("user", "");
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
      } catch (error: any) {
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
        this.token = data.data.token;
        cookies.set("token", data.data.token);
        const user: User = {
          first_name: data.data.first_name,
          last_name: data.data.last_name,
          email: data.data.email,
          phone_number: data.data.phone_number,
          address: data.data.address,
          avatar: data.data.avatar,
          created_at: data.data.created_at,
          is_marketing: data.data.is_marketing,
          updated_at: data.data.updated_at,
          uuid: data.data.uuid,
        };
        this.user = user;
        cookies.set("user", JSON.stringify(user));
        this.isLoading = false;

        return data;
      } catch (error: any) {
        this.error = error.response.data.error;
        this.errors = error.response.data.errors;
        this.isLoading = false;

        throw error;
      }
    },

    async logout() {
      const snackbarStore = useSnackbarStore();
      try {
        this.isLoading = true;
        this.resetErrors();

        const { data } = await axios.get(
          import.meta.env.VITE_API_URL + "/user/logout",
          {
            headers: {
              Authorization: "Bearer " + this.token,
            },
          }
        );
        this.reset();
        this.resetCookies();
        snackbarStore.setState(true, "Logout success", "success");

        return data;
      } catch (error: any) {
        this.isLoading = false;
        snackbarStore.setState(true, error.response.data.error, "error");
        this.error = error.response.data.error;
        this.errors = error.response.data.errors;

        throw error;
      }
    },

    async getUserData() {
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

        this.user = data.data;
        cookies.set("user", JSON.stringify(data.data));
        this.isLoading = false;

        return data;
      } catch (error: any) {
        const snackbarStore = useSnackbarStore();
        snackbarStore.setState(true, error.response.data.error, "error");
        this.error = error.response.data.error;
        this.errors = error.response.data.errors;
        this.isLoading = false;

        throw error;
      }
    },

    async getUserOrders(page: number, perPage: number) {
      try {
        this.isLoading = true;
        this.resetErrors();
        const { data } = await axios.get(
          import.meta.env.VITE_API_URL +
            `/user/orders?page=${page}&per_page=${perPage}`,
          {
            headers: {
              Authorization: "Bearer " + this.token,
            },
          }
        );

        this.orders = data.data;
        this.isLoading = false;
        return data;
      } catch (error: any) {
        this.error = error.response.data.error;
        this.errors = error.response.data.errors;
        this.isLoading = false;

        throw error;
      }
    },
  },
});

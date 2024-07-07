<script lang="ts" setup>
/**
 * @fileoverview Description of file. This file defines the navigation bar component
 */

import { useAuthStore } from "@/stores/authStore";
import { ref } from "vue";

const authStore = useAuthStore();
const isAuthenticated = ref<boolean>(
  authStore.token != "" || authStore.user != null
);
watch(
  authStore,
  () => {
    isAuthenticated.value = authStore.token != "" || authStore.user != null;
  },
  { deep: true }
);

const isDrawerOpen = ref<Boolean>(false);
const items = ref<any[]>([
  {
    title: "Products",
    value: "products",
  },
  {
    title: "Promotion",
    value: "promotion",
  },
  {
    title: "Blog",
    value: "blog",
  },
]);

const isLoginDialogVisible = ref<boolean>(false);
const handleLoginDialogCloseEvent = () => {
  isLoginDialogVisible.value = false;
};

const isRegisterDialogVisible = ref<boolean>(false);
const handleRegisterDialogCloseEvent = () => {
  isRegisterDialogVisible.value = false;
};
</script>

<template>
  <div>
    <v-app-bar
      app
      scroll-behavior="hide"
      :elevation="0"
      color="#4ec690"
      id="app-header"
    >
      <v-container>
        <v-row no-gutters align="center" justify="space-between">
          <v-col md="2" cols="4">
            <v-app-bar-title>
              <v-icon size="large" icon="mdi-paw"></v-icon>
              petson.</v-app-bar-title
            >
          </v-col>

          <v-col md="4" cols="0" class="d-md-flex d-none">
            <v-row no-gutters>
              <v-col>
                <v-btn
                  append-icon="mdi-menu-down"
                  variant="text"
                  class="navigation-item-lg"
                >
                  Products
                </v-btn>
              </v-col>
              <v-col>
                <v-btn variant="text" class="navigation-item-lg">
                  Promotions
                </v-btn>
              </v-col>
              <v-col>
                <v-btn variant="text" class="navigation-item-lg"> Blog </v-btn>
              </v-col>
            </v-row>
          </v-col>

          <v-col class="d-md-flex d-none" md="4" cols="0">
            <v-row class="ga-2" no-gutters>
              <v-col>
                <v-btn prepend-icon="mdi-cart" variant="outlined">
                  Cart (0)</v-btn
                >
              </v-col>
              <v-col>
                <v-btn
                  v-if="!isAuthenticated"
                  @click="isLoginDialogVisible = !isLoginDialogVisible"
                  variant="outlined"
                >
                  Login
                </v-btn>
                <v-btn v-else @click="authStore.logout" variant="outlined">
                  Logout
                </v-btn>
              </v-col>
              <v-col>
                <v-avatar
                  v-if="isAuthenticated"
                  class="profile-avatar"
                  size="small"
                  color="info"
                >
                  <v-icon icon="mdi-account-circle"></v-icon>
                </v-avatar>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="d-md-none d-flex" md="0" cols="1">
            <v-app-bar-nav-icon
              variant="text"
              @click.stop="isDrawerOpen = !isDrawerOpen"
            ></v-app-bar-nav-icon>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <v-navigation-drawer
      v-model="isDrawerOpen"
      location="top"
      temporary
      color="#4ec690"
    >
      <v-list density="compact">
        <v-list-item v-for="(item, i) in items" :key="i" :value="item.value">
          <v-list-item-title class="navigation-item">{{
            item.title
          }}</v-list-item-title>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-6 ga-4 d-flex flex-column">
          <v-btn color="white" prepend-icon="mdi-cart" variant="outlined">
            Cart (0)</v-btn
          >
          <v-btn
            v-if="!isAuthenticated"
            @click="isLoginDialogVisible = !isLoginDialogVisible"
            color="white"
            variant="outlined"
          >
            Login
          </v-btn>
          <v-btn
            v-else
            @click="
              () => {
                authStore.logout();
                isDrawerOpen = false;
              }
            "
            color="white"
            variant="outlined"
          >
            Logout
          </v-btn>
          <div class="d-flex justify-center">
            <v-btn>
              <v-avatar v-if="isAuthenticated" color="info">
                <v-icon icon="mdi-account-circle"></v-icon>
              </v-avatar>
            </v-btn>
          </div>
        </div>
      </template>
    </v-navigation-drawer>
    <LoginDialog
      @close="handleLoginDialogCloseEvent"
      @openRegisterDialog="isRegisterDialogVisible = true"
      :isDialogVisible="isLoginDialogVisible"
    />
    <RegisterDialog
      @close="handleRegisterDialogCloseEvent"
      @openLoginDialog="isLoginDialogVisible = true"
      :isDialogVisible="isRegisterDialogVisible"
    />
  </div>
</template>

<style scoped>
.v-app-bar {
  /* padding-block: 10px; */
  color: white !important;
}

.fill-height {
  height: 100vh;
}

.navigation-item-lg {
  color: white !important;
  font-size: 16px !important;
  font-weight: 500;
}

.navigation-item {
  color: white !important;
  font-size: 18px !important;
}

.profile-avatar {
  cursor: pointer;
}
</style>

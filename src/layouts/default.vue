<script lang="ts" setup>
/**
 * @fileoverview Description of file. This file defines the default layout of the application
 */

import { useSnackbarStore } from "@/stores/snackbarStore";
const snackbarStore = useSnackbarStore();
</script>

<template>
  <v-app>
    <v-snackbar
      v-model="snackbarStore.isVisible"
      :color="snackbarStore.color"
      :timeout="2000"
      :location="'top'"
    >
      {{ snackbarStore.message }}

      <template v-slot:actions>
        <v-btn color="white" variant="text" @click="snackbarStore.reset()">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <AppHeader />
    <v-main>
      <router-view />
    </v-main>
    <AppFooter />
  </v-app>
</template>

<style scoped>
html,
body,
#app {
  height: 100%;
  margin: 0;
}
.v-application {
  min-height: 100vh;
}
</style>

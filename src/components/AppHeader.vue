<template>
  <v-app>
    <v-app-bar scroll-behavior="hide" :elevation="0" color="#4ec690">
      <v-container>
        <v-row no-gutters align="center" justify="space-between">
          <v-col md="2" cols="4">
            <v-app-bar-title>
              <v-icon size="large" icon="mdi-paw"></v-icon>
              petson.</v-app-bar-title
            >
          </v-col>

          <v-col md="5" cols="0" class="d-md-flex d-none">
            <v-row no-gutters>
              <v-col>
                <v-btn append-icon="mdi-menu-down" variant="text">
                  Products
                </v-btn>
              </v-col>
              <v-col>
                <v-btn variant="text"> Promotions </v-btn>
              </v-col>
              <v-col>
                <v-btn variant="text"> Blog </v-btn>
              </v-col>
            </v-row>
          </v-col>

          <v-col class="d-md-flex d-none" md="3" cols="0">
            <v-row no-gutters>
              <v-col>
                <v-btn prepend-icon="mdi-cart" variant="outlined">
                  Cart (0)</v-btn
                >
              </v-col>
              <v-col>
                <v-btn variant="outlined"> Login </v-btn>
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
    <!-- <v-navigation-drawer
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
          <v-btn color="white" variant="outlined"> Login </v-btn>
        </div>
      </template>
    </v-navigation-drawer> -->
  </v-app>
</template>
<script lang="ts" setup>
import { ref } from "vue";

const isDrawerOpen = ref<Boolean>(false);

const items = ref<any[]>([
  {
    title: "Products",
    value: "foo",
  },
  {
    title: "Promotion",
    value: "bar",
  },
  {
    title: "Blog",
    value: "fizz",
  },
]);
</script>

<style scoped>
.v-app-bar {
  /* padding-block: 10px; */
  color: white !important;
}
.fill-height {
  height: 100vh;
}
.navigation-item {
  color: white !important;
  font-size: 18px !important;
}
</style>

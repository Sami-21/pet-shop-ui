<template>
  <v-app>
    <AppHeader />
    <v-main>
      <router-view />
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script lang="ts" setup>
//
</script>

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

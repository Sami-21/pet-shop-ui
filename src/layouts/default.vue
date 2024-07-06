<template>
  <v-app>
    <v-main>
      <AppHeader />
      <router-view />
    </v-main>
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

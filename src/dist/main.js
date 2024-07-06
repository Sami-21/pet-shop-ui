"use strict";
/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */
exports.__esModule = true;
// Plugins
var plugins_1 = require("@/plugins");
// Components
var App_vue_1 = require("./App.vue");
// Composables
var vue_1 = require("vue");
var app = vue_1.createApp(App_vue_1["default"]);
plugins_1.registerPlugins(app);
app.mount("#app");

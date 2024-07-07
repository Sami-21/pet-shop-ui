/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from "./vuetify";
import pinia from "../stores";
import router from "../router";
import VueCookies from "vue3-cookies";

// Types
import type { App } from "vue";

export function registerPlugins(app: App) {
  app.use(vuetify).use(router).use(pinia).use(VueCookies, {
    expireTimes: "1d",
    domain: "",
    secure: true,
    sameSite: "None",
  });
}

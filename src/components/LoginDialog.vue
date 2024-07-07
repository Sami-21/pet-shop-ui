<script lang="ts" setup>
/**
 * @fileoverview Description of file. This file defines the login dialog component responsible for the authencitation of the user
 */

import { useAuthStore } from "@/stores/authStore";
import { VForm } from "vuetify/components";

const authStore = useAuthStore();

const emit = defineEmits(["close", "openRegisterDialog"]);
const props = defineProps({
  isDialogVisible: { type: Boolean, required: true },
});

const dialog = ref<Boolean>(props.isDialogVisible);
watch(dialog, (newVal) => {
  if (!newVal) closeDialog();
});

watch(
  () => props.isDialogVisible,
  (newVal) => {
    dialog.value = newVal;
  }
);

const closeDialog = () => {
  dialog.value = false;
  emit("close");
};

const openRegisterDialog = () => {
  dialog.value = false;
  emit("openRegisterDialog");
  emit("close");
};

const form = ref<VForm | null>(null);

const email = ref<string>("");
const emailRules = ref<any[]>([
  (value: string) => {
    if (value) return true;

    return "E-mail is required.";
  },
  (value: string) => {
    if (/.+@.+\..+/.test(value)) return true;

    return "E-mail must be valid.";
  },
]);
const password = ref<string>("");
const isPasswordShown = ref<boolean>(false);
const passwordRules = ref<any[]>([
  (value: string) => {
    if (value) return true;

    return "Password is required.";
  },
]);

const submit = async () => {
  try {
    if (form.value) {
      const { valid } = await form.value.validate();
      if (valid) {
        await authStore.login(email.value, password.value);
        closeDialog();
      }
    }
  } catch (error) {
    // console.log(error);
  }
};
</script>

<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="550">
      <v-card class="py-10 px-16">
        <v-row>
          <v-col class="d-flex flex-column align-center justify-center">
            <div class="logo-container">
              <v-icon size="56" icon="mdi-paw"></v-icon>
              <span class="inline-block">petson.</span>
            </div>
            <p class="text-h5 text-center mt-3 mb-5" data-v-7fccc961="">
              Log In
            </p>
          </v-col>
        </v-row>
        <v-form @submit.prevent="submit" ref="form">
          <v-row>
            <v-text-field
              class="mb-4"
              label="email"
              variant="outlined"
              v-model="email"
              :rules="emailRules"
              required
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              class="mb-4"
              label="Password"
              variant="outlined"
              v-model="password"
              :rules="passwordRules"
              :type="isPasswordShown ? 'text' : 'password'"
              :append-inner-icon="isPasswordShown ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="isPasswordShown = !isPasswordShown"
              required
            ></v-text-field>
          </v-row>
          <v-checkbox label="Remember me"></v-checkbox>
          <v-btn
            block
            class="login-btn"
            color="#4ec690"
            type="submit"
            :loading="authStore.isLoading"
            >Log In</v-btn
          >
          <p class="text-center mt-2 text-red" v-if="authStore.error">
            {{ authStore.error }}
          </p>
        </v-form>

        <v-card-actions class="mt-2">
          <a class="card-action-item" href="/recover">Forgot password?</a>
          <v-spacer></v-spacer>
          <span @click="openRegisterDialog" class="card-action-item"
            >Don't have an account? Sign up</span
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
.logo-container {
  color: white;
  align-items: center;
  flex-direction: column;
  background-color: #4ec690;
  border-radius: 999px;
  display: flex;
  height: 100px;
  justify-content: center;
  width: 100px;
}

.login-btn {
  color: white !important;
}

.card-action-item {
  color: #1976d2;
  text-decoration: none;
  cursor: pointer;
  padding: 8px;
}
</style>

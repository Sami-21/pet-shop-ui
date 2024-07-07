<script lang="ts" setup>
/**
 * @fileoverview Description of file. This file defines the Register dialog component responsible for the user acount creation
 */

import { useAuthStore } from "@/stores/authStore";
import { CreateUserData } from "@/types/createUserData.type";
import { VForm } from "vuetify/components";

const authStore = useAuthStore();

const emit = defineEmits(["close", "openLoginDialog"]);
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

const openLoginDialog = () => {
  dialog.value = false;
  emit("openLoginDialog");
  emit("close");
};

const form = ref<VForm | null>(null);
const loading = ref<Boolean>(false);

const firstName = ref<string>("");
const firstNameRules = ref<any[]>([
  (value: string) => {
    if (value) return true;

    return "First name is required.";
  },
]);
const lastName = ref<string>("");
const lastNameRules = ref<any[]>([
  (value: string) => {
    if (value) return true;

    return "Last name is required.";
  },
]);
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
const phone = ref<string>("");
const phoneRules = ref<any[]>([
  (value: string) => {
    if (value) return true;

    return "Phone number is required.";
  },
]);
const address = ref<string>("");
const addressRules = ref<any[]>([
  (value: string) => {
    if (value) return true;

    return "Address is required.";
  },
]);
const password = ref<string>("password");
const isPasswordShown = ref<boolean>(false);
const passwordRules = ref<any[]>([
  (value: string) => {
    if (value) return true;

    return "Password is required.";
  },
  (value: string) => {
    if (value.length < 8) return "Password must be atleast 8 characters long.";
    return true;
  },
]);
const passwordConfirmation = ref<string>("password");
const isPasswordShownConfirmation = ref<boolean>(false);
const passwordConfirmationRules = ref<any[]>([
  (value: string) => {
    if (value) return true;

    return "Password confirmation is required.";
  },
  (value: string) => {
    if (value !== password.value)
      return "Password confirmation must match the password.";
    return true;
  },
]);

const submit = async () => {
  loading.value = true;
  if (form.value) {
    const { valid } = await form.value.validate();
    loading.value = false;
    if (valid) {
      const data: CreateUserData = {
        first_name: firstName.value,
        last_name: lastName.value,
        email: email.value,
        phone_number: phone.value,
        address: address.value,
        password: password.value,
        password_confirmation: passwordConfirmation.value,
      };
      await authStore.create(data);
      closeDialog();
    }
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
              Sign up
            </p>
          </v-col>
        </v-row>
        <v-form @submit.prevent="submit" ref="form">
          <v-row>
            <v-col class="pl-0">
              <v-text-field
                label="First Name*"
                variant="outlined"
                v-model="firstName"
                :rules="firstNameRules"
                required
              ></v-text-field>
            </v-col>
            <v-col class="pr-0">
              <v-text-field
                label="Last Name*"
                variant="outlined"
                v-model="lastName"
                :rules="lastNameRules"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-text-field
              label="Email Address*"
              variant="outlined"
              v-model="email"
              :rules="emailRules"
              required
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              label="Phone Number*"
              variant="outlined"
              v-model="phone"
              :rules="phoneRules"
              required
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              label="Address*"
              variant="outlined"
              v-model="address"
              :rules="addressRules"
              required
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              label="Password*"
              variant="outlined"
              v-model="password"
              :rules="passwordRules"
              :type="isPasswordShown ? 'text' : 'password'"
              :append-inner-icon="isPasswordShown ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="isPasswordShown = !isPasswordShown"
              required
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              label="Confirm Password*"
              variant="outlined"
              v-model="passwordConfirmation"
              :rules="passwordConfirmationRules"
              :type="isPasswordShownConfirmation ? 'text' : 'password'"
              :append-inner-icon="
                isPasswordShownConfirmation ? 'mdi-eye' : 'mdi-eye-off'
              "
              @click:append-inner="
                isPasswordShownConfirmation = !isPasswordShownConfirmation
              "
              required
            ></v-text-field>
          </v-row>
          <v-checkbox
            label="I want to receive inspiration, marketing promotions and updates via email."
          ></v-checkbox>
          <v-btn
            block
            class="login-btn"
            color="#4ec690"
            type="submit"
            :loading="loading"
            >Sign up</v-btn
          >
          <p class="text-center mt-2 text-red" v-if="authStore.error">
            {{ authStore.error }}
          </p>
        </v-form>

        <v-card-actions class="justify-center">
          <span @click="openLoginDialog" class="card-action-item"
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

<script setup lang="ts">
/**
 * @fileoverview Description of file. This file defines the component where user details and orders listing are displayed
 */

import { useAuthStore } from "@/stores/authStore";
const authStore = useAuthStore();

const emit = defineEmits(["close"]);
const props = defineProps({
  isDialogVisible: { type: Boolean, required: true },
});

const itemsPerPage = ref<number>(5);
const currentPage = ref<number>(1);
const headers = [
  {
    title: "Order UUID",
    key: "uuid",
  },
  { title: "Status", key: "status" },
  {
    title: "Download invoice",
    key: "action",
    align: "center",
    sortable: false,
  },
];
const search = ref<string>("");
const getOrderStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case "paid":
      return "#4EC690";
    case "open":
      return "#2196F3";
    case "pending payment":
      return "#F09E00";
    case "shipped":
      return "#008655";
    case "cancelled":
      return "#B6C4C1";

    default:
      return "";
  }
};

const dialog = ref<Boolean>(props.isDialogVisible);
watch(dialog, (newVal) => {
  if (!newVal) closeDialog();
  if (newVal) {
    authStore.getUserData();
    authStore.getUserOrders(currentPage.value, itemsPerPage.value);
  }
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
</script>

<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="750">
      <v-card rounded="lg">
        <v-card-title class="d-flex justify-space-between align-center">
          <div></div>
          <div class="text-h5 text-medium-emphasis ps-2 text-center">
            User settings
          </div>

          <v-btn @click="closeDialog" icon="mdi-close" variant="text"></v-btn>
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="3" class="d-flex align-center justify-center">
              <v-avatar class="profile-avatar" color="info" size="96">
                <v-icon size="64" icon="mdi-account-circle"></v-icon>
              </v-avatar>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col class="d-flex flex-column" cols="3">
              <div>
                <span class="sub-title">Name</span>
                <p>
                  {{
                    authStore.user?.first_name + " " + authStore.user?.last_name
                  }}
                </p>
              </div>
              <div>
                <span class="sub-title">Date joined</span>
                <p>{{ authStore.user?.created_at.slice(0, 10) }}</p>
              </div>
            </v-col>
            <v-col class="d-flex flex-column" cols="3">
              <div>
                <span class="sub-title">Phone number</span>
                <p>{{ authStore.user?.phone_number }}</p>
              </div>
              <div>
                <span class="sub-title">Email</span>
                <p>{{ authStore.user?.email }}</p>
              </div>
            </v-col>
            <v-col class="d-flex flex-column" cols="3">
              <div>
                <span class="sub-title">Address</span>
                <p>{{ authStore.user?.address }}</p>
              </div>
              <div>
                <span class="sub-title">Marketing preferences</span>
                <p>{{ authStore.user?.is_marketing ? "Yes" : "No" }}</p>
              </div>
            </v-col>
          </v-row>
          <v-data-table-server
            v-model:items-per-page="itemsPerPage"
            :headers="headers"
            :items="authStore.orders"
            :items-length="authStore.totalOrders"
            :loading="authStore.isLoading"
            :search="search"
            item-value="name"
            @update:options="() => {}"
          >
            <template #item.status="{ item }">
              <v-chip :color="getOrderStatusColor(item.status)">{{
                item.status
              }}</v-chip>
            </template>

            <template #item.action="{ item }">
              <v-btn
                color="#DDE3E2"
                rounded="sm"
                density="compact"
                icon="mdi-tray-arrow-down"
              ></v-btn>
            </template>
          </v-data-table-server>
        </v-card-text>

        <v-divider class="mt-2"></v-divider>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
.sub-title {
  color: #00000054;
  margin-bottom: 10px;
}
</style>

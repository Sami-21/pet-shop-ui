<script setup lang="ts">
/**
 * @fileoverview Description of file. This file defines the footer component
 */
</script>

<template>
  <v-footer height="auto" app color="#edf5f1" class="py-16">
    <v-container class="d-flex justify-center">
      <v-row class="d-felx flex-md-row flex-column justify-center">
        <v-col class="flex-column" align="center">
          <v-icon size="64" icon="mdi-paw" color="#4EC690"></v-icon>
          <h4 class="brand-title">petson.</h4>
        </v-col>
        <v-col>
          <ul>
            <h4>Petson</h4>
            <li class="footer-list-item mt-1">
              <a class="footer-links" href=""> Blog </a>
            </li>
            <li class="footer-list-item mt-1">
              <a class="footer-links" href=""> About us </a>
            </li>
            <li class="footer-list-item mt-1">
              <a class="footer-links" href=""> Store locator </a>
            </li>
          </ul>
        </v-col>
        <v-col>
          <ul>
            <h4>Contact</h4>
            <li class="footer-list-item mt-1">
              <a class="footer-links" href="mailto:contact@petson"
                >contact@petson</a
              >
            </li>
            <li class="footer-list-item mt-1">+385 000 000</li>
            <li class="footer-list-item mt-1">
              35 Shnauzer avenue, Dogville AL
            </li>
          </ul>
        </v-col>
        <v-col>
          <ul>
            <h4>Information</h4>
            <li class="footer-list-item mt-1">
              <a class="footer-links" href="/">Ordering and shipping</a>
            </li>
            <li class="footer-list-item mt-1">
              <a class="footer-links" href="/">FAQ</a>
            </li>
            <li class="footer-list-item mt-1">
              <a class="footer-links" href="/">GDPR statement</a>
            </li>
          </ul>
        </v-col>
        <v-col>
          <h4></h4>
          <p class="footer-list-item">
            If you can't find answer to your question, please contact our
            <a class="customer-service" href="/"> customer service </a>
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<style scoped>
.container {
  background-color: #edf5f1;
}
.brand-title {
  color: #4ec690;
}

ul {
  list-style-type: none;
}

.footer-list-item {
  color: #0000008a;
}

.footer-links {
  color: inherit;
  text-decoration: none;
}

.customer-service {
  color: #1976d2;
  text-decoration: none;
}
</style>

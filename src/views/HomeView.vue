<template>
  <v-row class="text-center">
    <v-col cols="12">
      <v-img :src="logo" class="my-3" contain height="200" />
    </v-col>

    <v-col cols="12" class="mb-4">
      <h1 class="display-2 font-weight-bold mb-3">LOG</h1>

      <p class="subheading font-weight-regular">
        Aplikacja do wizualizacji metody CMP i rysowania ścieżek krytycznych
      </p>
    </v-col>

    <v-col cols="12">
      <v-btn size="x-large" color="primary" router to="/form">
        Rozpocznij
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import logo from "@Assets/logo.svg";

export default defineComponent({
  name: "HomeView",
  data() {
    return {
      logo,
    };
  },
});
</script>

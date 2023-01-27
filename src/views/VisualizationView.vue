<template>
  <v-row class="text-center">
    <v-col cols="12">
      <h1 class="display-2 font-weight-bold mb-3">Wizualizacja danych</h1>
    </v-col>
  </v-row>
  <v-row class="text-center">
    <v-col cols="12">
      <div id="network"></div>
    </v-col>
  </v-row>
  <v-row class="text-center">
    <v-spacer />
    <v-col cols="6">
      <v-btn
        color="primary"
        size="x-large"
        block
        :disabled="false"
        router
        to="/form"
      >
        Rysuj kolejny
      </v-btn>
    </v-col>
    <v-spacer />
  </v-row>
</template>

<script>
import { defineComponent } from "vue";
import Network from "@/models/Network";
import NetworkTransformer from "@/models/NetworkTransformer";

export default defineComponent({
  name: "VisualizationView",
  data() {
    return {};
  },
  methods: {
    drawNetwork() {
      const transformer = new NetworkTransformer(this.activities);
      console.log("widok", this.activities);
      transformer.transform();
      console.log(transformer.getNodes(), transformer.getEdges());
      const network = new Network(
        transformer.getNodes(),
        transformer.getEdges(),
        "network"
      );
      network.draw();
    },
  },
  computed: {
    activities: {
      get() {
        return this.$store.getters.activities;
      },
    },
  },
  mounted() {
    this.drawNetwork();
  },
});
</script>
<style>
#network {
  width: 80vw;
  height: 80vh;
}
</style>

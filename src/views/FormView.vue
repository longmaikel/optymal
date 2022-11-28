<template>
  <v-row class="text-center">
    <v-col cols="12">
      <h1 class="display-2 font-weight-bold mb-3">DANE</h1>
      <p class="subheading font-weight-regular">
        Wprowadź niezbędne dane, aby rozpoczać wyliczenia
      </p>
    </v-col>
  </v-row>
  <v-form>
    <v-row class="mt-10">
      <v-col cols="2"></v-col>
      <v-col cols="4">
        <v-select
          label="Sposób określania zdarzeń"
          :items="['Czynność poprzedzająca', 'Następstwo zdarzeń']"
          variant="outlined"
          v-model="strategy"
          :disabled="true"
        ></v-select>
      </v-col>
    </v-row>
    <v-row v-for="(activity, key) in activities" :key="key">
      <v-spacer />
      <v-col cols="8" class="d-flex">
        <v-text-field
          v-model="activity.name"
          label="Zdarzenie"
          variant="outlined"
          readonly
          :disabled="inputDisabled"
        ></v-text-field>
        <v-text-field
          v-model="activity.time"
          label="Czas trwania"
          variant="outlined"
          class="mx-4"
          :disabled="inputDisabled"
        ></v-text-field>
        <v-select
          v-model="activity.connections"
          :label="strategyInputLabel"
          multiple
          :items="getAvailableConnections(activity.name)"
          :readonly="!getAvailableConnections(activity.name).length"
          variant="outlined"
          :disabled="inputDisabled"
        ></v-select>
      </v-col>
      <v-spacer />
    </v-row>
    <v-row>
      <v-spacer />
      <v-col cols="8" class="d-flex justify-end">
        <v-btn
          color="primary"
          size="large"
          @click="addActivity"
          :disabled="addActivityBtnDisabled"
          >Dodaj zdarzenie</v-btn
        >
      </v-col>
      <v-spacer />
    </v-row>
  </v-form>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "FormView",
  data() {
    return {};
  },
  computed: {
    strategy: {
      get() {
        return this.$store.getters.strategy;
      },
      set(strategy) {
        this.$store.commit("SET_STRATEGY", strategy);
      },
    },
    activities: {
      get() {
        return this.$store.getters.activities;
      },
      set(activities) {
        return this.$store.commit("SET_ACTIVITIES", activities);
      },
    },
    strategyInputLabel() {
      return this.$store.getters.strategyInputLabel;
    },
    addActivityBtnDisabled() {
      return this.$store.getters.isDisabled || !this.$store.getters.strategy;
    },
    inputDisabled() {
      return !this.$store.getters.strategy;
    },
  },
  methods: {
    addActivity() {
      this.$store.commit("ADD_DUMMY_ACTIVITY");
    },
    getAvailableConnections(letter) {
      return this.activities
        .filter((a) => a.name !== letter)
        .map((a) => a.name);
    },
  },
});
</script>

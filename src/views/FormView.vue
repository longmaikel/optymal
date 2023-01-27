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
    <!--    <v-row class="mt-10">-->
    <!--      <v-col cols="2"></v-col>-->
    <!--      <v-col cols="4">-->
    <!--        <v-select-->
    <!--          label="Sposób określania zdarzeń"-->
    <!--          :items="['Czynność poprzedzająca', 'Następstwo zdarzeń']"-->
    <!--          variant="outlined"-->
    <!--          v-model="strategy"-->
    <!--          :disabled="true"-->
    <!--        ></v-select>-->
    <!--      </v-col>-->
    <!--    </v-row>-->
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
        <v-text-field
          v-model="activity.connections"
          :label="strategyInputLabel"
          variant="outlined"
          :disabled="inputDisabled"
        ></v-text-field>
      </v-col>
      <v-spacer />
    </v-row>
    <v-row>
      <v-spacer />
      <v-col cols="8" class="d-flex justify-end">
        <v-btn
          color="primary"
          size="small"
          @click="addActivity"
          :disabled="addActivityBtnDisabled"
          >Dodaj zdarzenie</v-btn
        >
      </v-col>
      <v-spacer />
    </v-row>
    <v-row class="mt-8">
      <v-spacer />
      <v-col cols="6">
        <v-btn
          color="primary"
          size="x-large"
          block
          :disabled="false"
          router
          to="/visualization"
        >
          Przelicz
        </v-btn>
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
  },
  mounted() {
    this.$store.commit("CLEAR_ACTIVITIES");
  },
});
</script>

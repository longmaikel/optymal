import { createStore } from "vuex";
import { getNextLetter } from "@Models/Helper";

export default createStore({
  state: {
    isDisabled: false,
    strategy: "Czynność poprzedzająca",
    activities: [{ name: "A", time: null, connections: [] }],
  },
  getters: {
    activities: (state) => state.activities,
    strategy: (state) => state.strategy,
    strategyInputLabel: (state) => state.strategy,
    isDisabled: (state) => state.isDisabled,
  },
  mutations: {
    ADD_DUMMY_ACTIVITY(state) {
      const last = state.activities.at(-1);
      const nextActivityLetter: string = getNextLetter(last.name);
      state.activities.push({
        name: nextActivityLetter,
        time: null,
        connections: [],
      });
    },
    SET_ACTIVITIES(state, activities: []) {
      state.activities = activities;
    },
    SET_STRATEGY(state, strategy) {
      state.strategy = strategy;
    },
  },
  actions: {},
  modules: {},
});

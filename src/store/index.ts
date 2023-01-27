import { createStore } from "vuex";
import { getNextLetter } from "@Models/Helper";

export default createStore({
  state: {
    isDisabled: false,
    strategy: "Następstwo zdarzeń",
    activities: [{ name: "A", time: null, connections: null }],
    // activities: [
    //     { name: "A", time: 3, connections: '1-2' },
    //     { name: "B", time: 4, connections: '2-3' },
    //     { name: "C", time: 6, connections: '2-4' },
    //     { name: "D", time: 7, connections: '3-5' },
    //     { name: "E", time: 1, connections: '5-7' },
    //     { name: "F", time: 2, connections: '4-7' },
    //     { name: "G", time: 3, connections: '4-6' },
    //     { name: "H", time: 4, connections: '6-7' },
    //     { name: "I", time: 1, connections: '7-8' },
    //     { name: "J", time: 2, connections: '8-9' },
    // ],

    // activities: [
    //     { name: "A", time: 5, connections: '1-2' },
    //     { name: "B", time: 7, connections: '1-3' },
    //     { name: "C", time: 6, connections: '2-4' },
    //     { name: "D", time: 8, connections: '2-5' },
    //     { name: "E", time: 3, connections: '3-5' },
    //     { name: "F", time: 4, connections: '4-5' },
    //     { name: "G", time: 2, connections: '4-6' },
    //     { name: "H", time: 5, connections: '5-6' },
    // ],
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
        connections: null,
      });
    },
    SET_ACTIVITIES(state, activities: []) {
      state.activities = activities;
    },
    SET_STRATEGY(state, strategy) {
      state.strategy = strategy;
    },
    CLEAR_ACTIVITIES(state) {
      state.activities = [{ name: "A", time: null, connections: null }];
    },
  },
  actions: {},
  modules: {},
});

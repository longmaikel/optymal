import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "@Views/HomeView.vue";
import FormView from "@Views/FormView.vue";
import VisualizationView from "@Views/VisualizationView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/form",
    name: "form",
    component: FormView,
  },
  {
    path: "/visualization",
    name: "visualization",
    component: VisualizationView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

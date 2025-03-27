import { createRouter, createWebHistory } from "vue-router";
import Login from "./components/Login.vue";
import Profile from "./components/Profile.vue";

const routes = [
    { path: "/", component: Login },
    { path: "/profile/:id", component: Profile }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

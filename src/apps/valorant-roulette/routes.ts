import type { RouteRecordRaw } from "vue-router"

export default [
    {
        path: "/valorant-roulette",
        component: () => import("./pages/Home.vue")
    }
] satisfies RouteRecordRaw[]
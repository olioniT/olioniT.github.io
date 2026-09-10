import type { RouteRecordRaw } from "vue-router"

const routes: RouteRecordRaw[] = [
    {
        path: "/valorant-roulette",
        component: () => import("./pages/Home.vue"),
        meta: {
            title: "Valorant Roulette"
        }
    }
] satisfies RouteRecordRaw[]

export default routes
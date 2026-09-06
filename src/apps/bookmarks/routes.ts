import type { RouteRecordRaw } from "vue-router"

export default [
    {
        path: "/bookmarks",
        component: () => import("./pages/Home.vue")
    }
] satisfies RouteRecordRaw[]
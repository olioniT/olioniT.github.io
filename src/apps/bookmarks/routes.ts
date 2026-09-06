import type { RouteRecordRaw } from "vue-router"

const routes: RouteRecordRaw[] = [
    {
        path: "/bookmarks",
        component: () => import("./pages/Home.vue")
    }
] satisfies RouteRecordRaw[]

export default routes
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

import modules from "@/apps/registry"

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: modules.flatMap(module => module.routes)
})

export default router

import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

import modules from "@/apps/registry"

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: modules.flatMap(module => module.routes)
})

router.afterEach((to) => {
    const name = "olioniT.github.io"
    
    if (to.meta.title) {
        document.title = to.meta.title.toString()
    } else {
        document.title = name
    }
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layout/AppLayout.vue'
import HelloWorld from '@/components/HelloWorld.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '',
                    name: 'home',
                    component: HelloWorld // Temporary placeholder
                },
                {
                    path: 'diary',
                    name: 'diary',
                    component: () => import('@/components/HelloWorld.vue') // Placeholder
                },
                {
                    path: 'foods',
                    name: 'foods',
                    component: () => import('@/components/HelloWorld.vue') // Placeholder
                },
                {
                    path: 'weight',
                    name: 'weight',
                    component: () => import('@/components/HelloWorld.vue') // Placeholder
                },
                {
                    path: 'profile',
                    name: 'profile',
                    component: () => import('@/components/HelloWorld.vue') // Placeholder
                }
            ]
        },
        // Auth routes will be separate (outside AppLayout)
        {
            path: '/login',
            name: 'login',
            component: () => import('@/components/HelloWorld.vue') // Placeholder
        }
    ]
})

export default router

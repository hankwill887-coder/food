import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layout/AppLayout.vue'
import HelloWorld from '@/components/HelloWorld.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: AppLayout,
            meta: { requiresAuth: true },
            children: [
                {
                    path: '',
                    name: 'home',
                    component: () => import('@/views/diary/TodayView.vue')
                },
                {
                    path: 'weight',
                    name: 'weight',
                    component: () => import('@/views/weight/WeightView.vue')
                },
                // ... other routes
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/auth/LoginView.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('@/views/auth/RegisterView.vue')
        },
        {
            path: '/onboarding',
            name: 'onboarding',
            component: () => import('@/views/onboarding/OnboardingView.vue')
        }
    ]
})

export default router

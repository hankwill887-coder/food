<script setup lang="ts">
import { RouterView, RouterLink, useRoute } from 'vue-router'
import { 
  LayoutDashboard, 
  BookOpen, 
  Utensils, 
  Scale, 
  User 
} from 'lucide-vue-next'

const route = useRoute()

const navItems = [
  { name: 'Today', path: '/', icon: LayoutDashboard },
  { name: 'Diary', path: '/diary', icon: BookOpen },
  { name: 'Foods', path: '/foods', icon: Utensils },
  { name: 'Weight', path: '/weight', icon: Scale },
  { name: 'Profile', path: '/profile', icon: User },
]

const isActive = (path: string) => route.path === path
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex">
    <!-- Desktop Sidebar -->
    <aside class="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 fixed h-full z-20">
      <div class="h-16 flex items-center px-6 border-b border-slate-100">
        <span class="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
          Nutrition
        </span>
      </div>
      
      <nav class="flex-1 p-4 space-y-1">
        <RouterLink 
          v-for="item in navItems" 
          :key="item.path" 
          :to="item.path"
          class="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group"
          :class="isActive(item.path) 
            ? 'bg-primary-50 text-primary-600 font-medium shadow-sm' 
            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'"
        >
          <component 
            :is="item.icon" 
            class="w-5 h-5 transition-colors"
            :class="isActive(item.path) ? 'text-primary-500' : 'text-slate-400 group-hover:text-slate-600'"
          />
          {{ item.name }}
        </RouterLink>
      </nav>

      <div class="p-4 border-t border-slate-100">
        <div class="flex items-center gap-3 px-3 py-2">
          <div class="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-xs">
            JD
          </div>
          <div class="text-sm">
            <p class="font-medium text-slate-700">John Doe</p>
            <p class="text-xs text-slate-400">Basic Plan</p>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 lg:ml-64 pb-20 lg:pb-0">
      <div class="max-w-5xl mx-auto p-4 lg:p-8">
        <RouterView v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </RouterView>
      </div>
    </main>

    <!-- Mobile Bottom Navigation -->
    <nav class="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-30 pb-safe">
      <div class="flex justify-around items-center h-16">
        <RouterLink 
          v-for="item in navItems" 
          :key="item.path" 
          :to="item.path"
          class="flex flex-col items-center justify-center w-full h-full space-y-1"
          :class="isActive(item.path) ? 'text-primary-600' : 'text-slate-400'"
        >
          <component 
            :is="item.icon" 
            class="w-6 h-6 transition-transform duration-200"
            :class="isActive(item.path) ? 'scale-110' : ''"
          />
          <span class="text-[10px] font-medium">{{ item.name }}</span>
        </RouterLink>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Safe area padding for iPhone X+ */
.pb-safe {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import { ArrowRight, Apple, Crown } from 'lucide-vue-next'

const router = useRouter()
const form = ref({
  email: '',
  password: ''
})
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  // Simulate API call
  setTimeout(() => {
    loading.value = false
    router.push('/')
  }, 1000)
}
</script>

<template>
  <div class="min-h-screen grid lg:grid-cols-2 bg-white">
    <!-- Left: Branding Area -->
    <div class="hidden lg:flex flex-col justify-between p-12 bg-primary-900 relative overflow-hidden">
      <!-- Decor circle -->
      <div class="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-primary-800 rounded-full blur-3xl opacity-50"></div>
      <div class="absolute bottom-0 left-0 -ml-20 -mb-20 w-[600px] h-[600px] bg-emerald-950 rounded-full blur-3xl opacity-50"></div>

      <div class="relative z-10">
        <div class="flex items-center gap-2 text-emerald-100 mb-8">
          <Crown class="w-8 h-8" />
          <span class="text-xl font-bold tracking-tight">营养专家 Pro</span>
        </div>
        <h1 class="text-5xl font-extrabold text-white leading-tight mb-6">
          科学饮食<br />健康生活
        </h1>
        <p class="text-emerald-100/80 text-lg max-w-md">
          精准追踪卡路里、营养素与体重目标。加入数万用户的行列，通过科学管理收获理想身材。
        </p>
      </div>
      
      <div class="relative z-10">
        <div class="flex items-center gap-4 text-emerald-200/60 text-sm">
          <span>© 2026 营养项目组</span>
          <span>隐私政策</span>
          <span>服务条款</span>
        </div>
      </div>
    </div>

    <!-- Right: Login Form -->
    <div class="flex items-center justify-center p-6 lg:p-12">
      <div class="w-full max-w-md space-y-8">
        <div class="text-center lg:text-left">
          <h2 class="text-3xl font-bold tracking-tight text-slate-900">欢迎回来</h2>
          <p class="mt-2 text-slate-500">
            还没有账号？ 
            <RouterLink to="/register" class="font-medium text-primary-600 hover:text-primary-500 transition-colors">
              免费注册
            </RouterLink>
          </p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <BaseInput 
            id="email" 
            label="邮箱地址" 
            v-model="form.email" 
            placeholder="name@example.com"
          />
          <div class="space-y-1">
            <BaseInput 
              id="password" 
              label="登录密码" 
              type="password" 
              v-model="form.password" 
              placeholder="••••••••"
            />
            <div class="flex justify-end">
              <a href="#" class="text-sm font-medium text-primary-600 hover:text-primary-500">
                忘记密码？
              </a>
            </div>
          </div>

          <BaseButton type="submit" block :loading="loading" size="lg">
            立即登录
            <ArrowRight class="ml-2 w-5 h-5" />
          </BaseButton>
        </form>

        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-slate-200"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="bg-white px-2 text-slate-500">或通过社交账号登录</span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <BaseButton variant="outline" block>
            <Apple class="w-5 h-5 mr-2" />
            Apple
          </BaseButton>
          <BaseButton variant="outline" block>
            <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

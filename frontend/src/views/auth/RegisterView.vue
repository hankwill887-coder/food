<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import { ArrowLeft } from 'lucide-vue-next'

const router = useRouter()
const form = ref({
  name: '',
  email: '',
  password: ''
})
const loading = ref(false)

const handleRegister = async () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    router.push('/onboarding')
  }, 1000)
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="text-center">
        <h2 class="mt-6 text-3xl font-extrabold text-slate-900">创建新账号</h2>
        <p class="mt-2 text-sm text-slate-600">
          已有账号？
          <RouterLink to="/login" class="font-medium text-primary-600 hover:text-primary-500">
            直接登录
          </RouterLink>
        </p>
      </div>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow-xl shadow-slate-200/60 rounded-2xl sm:px-10 border border-slate-100">
        <form @submit.prevent="handleRegister" class="space-y-6">
          <BaseInput 
            id="name" 
            label="真实姓名" 
            v-model="form.name" 
            placeholder="张三"
          />

          <BaseInput 
            id="email" 
            label="邮箱地址" 
            v-model="form.email" 
            placeholder="name@example.com"
          />

          <BaseInput 
            id="password" 
            label="设置密码" 
            type="password" 
            v-model="form.password" 
            placeholder="至少 8 位字符"
          />

          <div class="flex items-center">
            <input id="terms" name="terms" type="checkbox" class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded">
            <label for="terms" class="ml-2 block text-sm text-slate-900">
              我已阅读并同意 <a href="#" class="text-primary-600 hover:text-primary-500">服务条款</a> 与 <a href="#" class="text-primary-600 hover:text-primary-500">隐私政策</a>
            </label>
          </div>

          <BaseButton type="submit" block :loading="loading" size="lg">
            创建账号
          </BaseButton>
        </form>
      </div>
    </div>
  </div>
</template>

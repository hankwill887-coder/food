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
        <h2 class="mt-6 text-3xl font-extrabold text-slate-900">Create your account</h2>
        <p class="mt-2 text-sm text-slate-600">
          Already have an account?
          <RouterLink to="/login" class="font-medium text-primary-600 hover:text-primary-500">
            Sign in
          </RouterLink>
        </p>
      </div>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow-xl shadow-slate-200/60 rounded-2xl sm:px-10 border border-slate-100">
        <form @submit.prevent="handleRegister" class="space-y-6">
          <BaseInput 
            id="name" 
            label="Full Name" 
            v-model="form.name" 
            placeholder="John Doe"
          />

          <BaseInput 
            id="email" 
            label="Email address" 
            v-model="form.email" 
            placeholder="name@example.com"
          />

          <BaseInput 
            id="password" 
            label="Password" 
            type="password" 
            v-model="form.password" 
            placeholder="min 8 characters"
          />

          <div class="flex items-center">
            <input id="terms" name="terms" type="checkbox" class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded">
            <label for="terms" class="ml-2 block text-sm text-slate-900">
              I agree to the <a href="#" class="text-primary-600 hover:text-primary-500">Terms</a> and <a href="#" class="text-primary-600 hover:text-primary-500">Privacy Policy</a>
            </label>
          </div>

          <BaseButton type="submit" block :loading="loading" size="lg">
            Create account
          </BaseButton>
        </form>
      </div>
    </div>
  </div>
</template>

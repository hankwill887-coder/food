<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import { ArrowLeft, ArrowRight, Check } from 'lucide-vue-next'

const router = useRouter()
const step = ref(1)
const totalSteps = 3

const formData = ref({
  gender: 'male',
  birthDate: '',
  height: 175,
  weight: 70,
  goal: 'lose',
  activity: 'sedentary'
})

const loading = ref(false)

const progress = computed(() => (step.value / totalSteps) * 100)

const nextStep = () => {
  if (step.value < totalSteps) {
    step.value++
  } else {
    finishOnboarding()
  }
}

const prevStep = () => {
  if (step.value > 1) step.value--
}

const finishOnboarding = () => {
  loading.value = true
  // Simulate saving data
  setTimeout(() => {
    loading.value = false
    router.push('/')
  }, 1000)
}

// Options
const goals = [
  { id: 'lose', label: 'Lose Weight', desc: 'Burn fat & get lean' },
  { id: 'maintain', label: 'Maintain', desc: 'Stay healthy & fit' },
  { id: 'gain', label: 'Gain Muscle', desc: 'Build mass & strength' },
]

const activityLevels = [
  { id: 'sedentary', label: 'Sedentary', desc: 'Office job, little exercise' },
  { id: 'light', label: 'Lightly Active', desc: '1-3 days/week exercise' },
  { id: 'moderate', label: 'Moderately Active', desc: '3-5 days/week exercise' },
  { id: 'active', label: 'Very Active', desc: '6-7 days/week hard exercise' },
]
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
    
    <!-- Progress Bar -->
    <div class="fixed top-0 left-0 w-full h-1 bg-slate-200 z-50">
      <div 
        class="h-full bg-primary-600 transition-all duration-500 ease-out"
        :style="{ width: `${progress}%` }"
      ></div>
    </div>

    <div class="sm:mx-auto sm:w-full sm:max-w-lg">
      <transition name="fade" mode="out-in">
        <div :key="step" class="bg-white py-8 px-4 shadow-xl shadow-slate-200/60 rounded-2xl sm:px-10 border border-slate-100">
          
          <!-- Step 1: Basic Info -->
          <div v-if="step === 1" class="space-y-6">
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-slate-900">Tell us about yourself</h2>
              <p class="text-slate-500 mt-2">To calculate your precise calorie needs.</p>
            </div>

            <div class="space-y-4">
              <label class="block text-sm font-medium text-slate-700">Gender</label>
              <div class="grid grid-cols-2 gap-4">
                <button 
                  v-for="g in ['male', 'female']" 
                  :key="g"
                  type="button"
                  @click="formData.gender = g"
                  class="relative flex items-center justify-center p-4 rounded-xl border-2 transition-all duration-200"
                  :class="formData.gender === g 
                    ? 'border-primary-500 bg-primary-50 text-primary-700' 
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'"
                >
                  <span class="capitalize font-medium">{{ g }}</span>
                  <div v-if="formData.gender === g" class="absolute top-2 right-2 text-primary-600">
                    <Check class="w-4 h-4" />
                  </div>
                </button>
              </div>

              <BaseInput 
                id="birthDate" 
                label="Date of Birth" 
                type="date" 
                v-model="formData.birthDate" 
              />
            </div>
          </div>

          <!-- Step 2: Body Metrics -->
          <div v-else-if="step === 2" class="space-y-6">
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-slate-900">Your Body Metrics</h2>
              <p class="text-slate-500 mt-2">We use this to estimate your metabolism.</p>
            </div>

            <div class="space-y-6">
              <BaseInput 
                id="height" 
                label="Height (cm)" 
                type="number" 
                v-model="formData.height" 
                placeholder="175"
              />
              <BaseInput 
                id="weight" 
                label="Current Weight (kg)" 
                type="number" 
                v-model="formData.weight" 
                placeholder="70"
              />
            </div>
          </div>

          <!-- Step 3: Goal & Activity -->
          <div v-else-if="step === 3" class="space-y-6">
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-slate-900">Your Goal</h2>
              <p class="text-slate-500 mt-2">What do you want to achieve?</p>
            </div>

            <div class="space-y-4">
              <div class="space-y-2">
                <label class="block text-sm font-medium text-slate-700">Goal</label>
                <div class="grid grid-cols-1 gap-2">
                  <button 
                    v-for="item in goals" 
                    :key="item.id"
                    type="button"
                    @click="formData.goal = item.id"
                    class="flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left"
                    :class="formData.goal === item.id 
                      ? 'border-primary-500 bg-primary-50' 
                      : 'border-slate-200 hover:border-slate-300'"
                  >
                    <div>
                      <p class="font-medium" :class="formData.goal === item.id ? 'text-primary-900' : 'text-slate-900'">{{ item.label }}</p>
                      <p class="text-xs" :class="formData.goal === item.id ? 'text-primary-600' : 'text-slate-500'">{{ item.desc }}</p>
                    </div>
                    <div v-if="formData.goal === item.id" class="text-primary-600">
                      <Check class="w-5 h-5" />
                    </div>
                  </button>
                </div>
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium text-slate-700">Activity Level</label>
                <select 
                  v-model="formData.activity"
                  class="block w-full rounded-xl border-slate-200 shadow-sm focus:border-primary-500 focus:ring-primary-500 py-3 px-4"
                >
                  <option v-for="item in activityLevels" :key="item.id" :value="item.id">
                    {{ item.label }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <!-- Navigation Buttons -->
          <div class="mt-8 flex items-center justify-between gap-4">
            <BaseButton 
              v-if="step > 1" 
              variant="ghost" 
              @click="prevStep"
            >
              <ArrowLeft class="w-5 h-5 mr-2" />
              Back
            </BaseButton>
            <div v-else></div> <!-- Spacer -->

            <BaseButton 
              variant="primary" 
              @click="nextStep"
              :loading="loading"
              class="min-w-[120px]"
            >
              {{ step === totalSteps ? 'Finish' : 'Next' }}
              <ArrowRight v-if="step !== totalSteps" class="w-5 h-5 ml-2" />
            </BaseButton>
          </div>

        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(10px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>

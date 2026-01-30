<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import { X, Flame } from 'lucide-vue-next'

const props = defineProps<{
  visible: boolean
  food: any
}>()

const emit = defineEmits(['update:visible', 'add'])

const amount = ref(1)
const unit = ref('serving') // serving or gram

const nutrients = computed(() => {
  if (!props.food) return { cal: 0, p: 0, c: 0, f: 0 }
  const ratio = unit.value === 'gram' ? amount.value / 100 : amount.value
  const base = props.food.nutrients // Assume per 1 serving or 100g based on data structure
  // For mock simple logic: assume food.nutrients is per 1 serving unit
  return {
    cal: Math.round(base.cal * ratio),
    p: Math.round(base.p * ratio),
    c: Math.round(base.c * ratio),
    f: Math.round(base.f * ratio)
  }
})

const close = () => emit('update:visible', false)
const add = () => {
  emit('add', { ...props.food, amount: amount.value, unit: unit.value, ...nutrients.value })
  close()
}
</script>

<template>
  <div v-if="visible" class="fixed inset-0 z-[60] flex items-end sm:items-center justify-center pointer-events-none">
    <!-- Backdrop -->
    <div @click="close" class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm pointer-events-auto transition-opacity"></div>

    <!-- Modal Card -->
    <div class="bg-white w-full max-w-md sm:rounded-3xl rounded-t-3xl shadow-2xl pointer-events-auto transform transition-all flex flex-col max-h-[90vh]">
      
      <!-- Header Image/Title -->
      <div class="relative h-48 bg-primary-100 rounded-t-3xl flex items-center justify-center overflow-hidden shrink-0">
        <Flame class="w-24 h-24 text-primary-200" />
        <button @click="close" class="absolute top-4 right-4 bg-white/50 hover:bg-white p-2 rounded-full transition-colors">
          <X class="w-5 h-5 text-slate-700" />
        </button>
        <div class="absolute bottom-4 left-6">
           <h3 class="text-2xl font-bold text-primary-900">{{ food?.name }}</h3>
           <p class="text-primary-700 font-medium">{{ food?.brand || 'Generic Food' }}</p>
        </div>
      </div>

      <!-- Content -->
      <div class="p-6 space-y-8 overflow-y-auto">
        
        <!-- Nutrition Grid -->
        <div class="grid grid-cols-4 gap-2 text-center">
          <div class="bg-slate-50 p-3 rounded-2xl">
            <div class="text-sm text-slate-500 font-medium">Cal</div>
            <div class="text-xl font-bold text-slate-900">{{ nutrients.cal }}</div>
          </div>
          <div class="bg-indigo-50 p-3 rounded-2xl">
            <div class="text-sm text-indigo-400 font-medium">Prot</div>
            <div class="text-xl font-bold text-indigo-700">{{ nutrients.p }}g</div>
          </div>
          <div class="bg-amber-50 p-3 rounded-2xl">
             <div class="text-sm text-amber-500 font-medium">Carb</div>
             <div class="text-xl font-bold text-amber-700">{{ nutrients.c }}g</div>
          </div>
          <div class="bg-rose-50 p-3 rounded-2xl">
             <div class="text-sm text-rose-400 font-medium">Fat</div>
             <div class="text-xl font-bold text-rose-700">{{ nutrients.f }}g</div>
          </div>
        </div>

        <!-- Inputs -->
        <div class="flex gap-4">
          <div class="flex-1">
            <label class="block text-sm font-medium text-slate-700 mb-1">Amount</label>
            <input 
              type="number" 
              v-model="amount" 
              class="block w-full rounded-xl border-slate-200 focus:border-primary-500 focus:ring-primary-500 text-center text-lg font-bold" 
            />
          </div>
          <div class="flex-1">
             <label class="block text-sm font-medium text-slate-700 mb-1">Unit</label>
             <select v-model="unit" class="block w-full rounded-xl border-slate-200 focus:border-primary-500 focus:ring-primary-500 text-base">
               <option value="serving">Serving</option>
               <option value="gram">Grams</option>
             </select>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="p-6 border-t border-slate-100 mt-auto">
        <BaseButton block size="lg" @click="add">Add to Log</BaseButton>
      </div>
    
    </div>
  </div>
</template>

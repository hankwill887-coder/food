<script setup lang="ts">
import { ref, computed } from 'vue'
import { Search, Plus, X, ChevronRight } from 'lucide-vue-next'
import BaseInput from '@/components/ui/BaseInput.vue'
import FoodDetailModal from './FoodDetailModal.vue'

const props = defineProps<{
  visible: boolean
  mealType: string
}>()

const emit = defineEmits(['update:visible'])

const searchQuery = ref('')
const selectedFood = ref(null)
const showDetail = ref(false)

const close = () => emit('update:visible', false)

// Mock DB
const allFoods = [
  { id: 1, name: '香蕉', brand: '通用', nutrients: { cal: 105, p: 1.3, c: 27, f: 0.3 } },
  { id: 2, name: '希腊酸奶', brand: 'Chobani', nutrients: { cal: 120, p: 12, c: 8, f: 0 } },
  { id: 3, name: '全麦面包', brand: 'Nature Own', nutrients: { cal: 80, p: 4, c: 15, f: 1 } },
  { id: 4, name: '杏仁', brand: 'Blue Diamond', nutrients: { cal: 164, p: 6, c: 6, f: 14 } },
  { id: 5, name: '鸡胸肉', brand: 'Kirkland', nutrients: { cal: 165, p: 31, c: 0, f: 3.6 } },
]

const results = computed(() => {
  if (!searchQuery.value) return []
  const q = searchQuery.value.toLowerCase()
  return allFoods.filter(f => f.name.toLowerCase().includes(q) || f.brand.toLowerCase().includes(q))
})

const openDetail = (food: any) => {
  selectedFood.value = food
  showDetail.value = true
}

const handleAddFood = (entry: any) => {
  console.log('Added:', entry)
  showDetail.value = false
  close() // Close drawer after adding
  // In real app, emit another event or store usage
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex justify-end" :class="{ 'pointer-events-none': !visible }">
    <!-- Backdrop -->
    <transition name="fade">
      <div v-if="visible" @click="close" class="absolute inset-0 bg-slate-900/20 backdrop-blur-sm pointer-events-auto"></div>
    </transition>

    <!-- Drawer Panel -->
    <transition name="slide-right">
      <div v-if="visible" class="relative w-full max-w-md bg-white h-full shadow-2xl pointer-events-auto flex flex-col">
        
        <!-- Header -->
        <div class="p-4 border-b border-slate-100 flex items-center gap-3">
          <button @click="close" class="p-2 -ml-2 rounded-full hover:bg-slate-50 text-slate-500">
            <X class="w-6 h-6" />
          </button>
          <h2 class="text-xl font-bold text-slate-900 capitalize">添加到 {{ mealType === 'breakfast' ? '早餐' : mealType === 'lunch' ? '午餐' : mealType === 'dinner' ? '晚餐' : '加餐' }}</h2>
        </div>

        <!-- Search -->
        <div class="p-4 border-b border-slate-100 bg-slate-50/50">
          <div class="relative">
            <Search class="absolute left-3 top-3 w-5 h-5 text-slate-400" />
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="搜索食物 (例如 '鸡肉')..." 
              class="block w-full pl-10 rounded-xl border-slate-200 shadow-sm focus:border-primary-500 focus:ring-primary-500 py-3"
              autoFocus
            />
          </div>
        </div>

        <!-- List -->
        <div class="flex-1 overflow-y-auto">
          <div v-if="results.length > 0" class="divide-y divide-slate-50">
            <div 
              v-for="food in results" 
              :key="food.id" 
              @click="openDetail(food)"
              class="p-4 hover:bg-slate-50 transition-colors cursor-pointer flex items-center justify-between"
            >
              <div>
                <p class="font-medium text-slate-800">{{ food.name }}</p>
                <p class="text-xs text-slate-500">{{ food.brand }} • {{ food.nutrients.cal }} kcal</p>
              </div>
              <Plus class="w-5 h-5 text-primary-500" />
            </div>
          </div>
          
          <!-- Recent/Empty State -->
          <div v-else class="p-8 text-center">
            <div v-if="!searchQuery" class="space-y-4">
              <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wide">最近常吃</h3>
              <div class="space-y-2">
                 <!-- Mock Recent -->
                <div @click="openDetail(allFoods[0])" class="p-3 bg-slate-50 rounded-xl flex items-center justify-between cursor-pointer">
                   <span class="text-slate-700">香蕉</span>
                   <Plus class="w-4 h-4 text-slate-400" />
                </div>
                <div @click="openDetail(allFoods[4])" class="p-3 bg-slate-50 rounded-xl flex items-center justify-between cursor-pointer">
                   <span class="text-slate-700">鸡胸肉</span>
                   <Plus class="w-4 h-4 text-slate-400" />
                </div>
              </div>
            </div>
            <div v-else class="text-slate-400 py-10">
              未找到食物 <br>
              <button class="mt-4 text-primary-600 font-medium hover:underline">创建自定义食物</button>
            </div>
          </div>
        </div>

      </div>
    </transition>

    <!-- Detail Modal -->
    <FoodDetailModal 
      :visible="showDetail" 
      :food="selectedFood"
      @update:visible="showDetail = $event"
      @add="handleAddFood"
    />

  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.slide-right-enter-active, .slide-right-leave-active { transition: transform 0.3s ease-out; }
.slide-right-enter-from, .slide-right-leave-to { transform: translateX(100%); }
</style>

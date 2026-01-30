<script setup lang="ts">
import { ref } from 'vue'
import { Plus, Flame, ChevronRight, MoreHorizontal } from 'lucide-vue-next'
import BaseButton from '@/components/ui/BaseButton.vue'
import FoodSearchDrawer from '@/components/food/FoodSearchDrawer.vue'

const showDrawer = ref(false)
const activeMeal = ref('')

const openDrawer = (mealId: string) => {
  activeMeal.value = mealId
  showDrawer.value = true
}

// Mock Data (Ref for reactivity)
const stats = ref({
  consumed: 1250,
  target: 2000,
  protein: { current: 85, target: 140 },
  carbs: { current: 120, target: 200 },
  fat: { current: 45, target: 70 }
})

const meals = ref([
  {
    id: 'breakfast',
    name: '早餐',
    calories: 450,
    items: [
      { id: 1, name: '燕麦蓝莓碗', portion: '1 碗', cal: 300 },
      { id: 2, name: '水煮蛋', portion: '2 个', cal: 150 }
    ]
  },
  {
    id: 'lunch',
    name: '午餐',
    calories: 600,
    items: [
      { id: 3, name: '鸡胸肉沙拉', portion: '1 份', cal: 450 },
      { id: 4, name: '苹果', portion: '1 个', cal: 150 }
    ]
  },
  {
    id: 'dinner',
    name: '晚餐',
    calories: 200,
    items: [
      { id: 5, name: '蛋白粉', portion: '1 勺', cal: 200 }
    ]
  },
  {
    id: 'snack',
    name: '加餐/零食',
    calories: 0,
    items: []
  }
])

// Helper for macro bars
const getPercent = (curr: number, max: number) => Math.min((curr / max) * 100, 100)

// Date Navigation
import { ChevronLeft, Calendar as CalendarIcon } from 'lucide-vue-next'
const currentDate = ref(new Date())

const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('zh-CN', options);
}

const changeDate = (days: number) => {
  const newDate = new Date(currentDate.value)
  newDate.setDate(newDate.getDate() + days)
  currentDate.value = newDate
  
  // Randomize mock data to show change
  stats.value.consumed = Math.floor(Math.random() * 1500) + 500
  meals.value[0].calories = Math.floor(Math.random() * 500)
}
</script>

<template>
  <div class="space-y-6">
    
    <!-- Date Header -->
    <div class="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
      <button @click="changeDate(-1)" class="p-2 hover:bg-slate-50 rounded-full text-slate-600">
        <ChevronLeft class="w-5 h-5" />
      </button>
      
      <div class="flex items-center gap-2 text-slate-800 font-bold text-lg">
        <CalendarIcon class="w-5 h-5 text-primary-500" />
        <span>{{ formatDate(currentDate) }}</span>
      </div>

      <button @click="changeDate(1)" class="p-2 hover:bg-slate-50 rounded-full text-slate-600">
        <ChevronRight class="w-5 h-5" />
      </button>
    </div>
    
    <!-- Top Section: Stats -->
    <section class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
      <div class="flex flex-col md:flex-row items-center gap-8">
        
        <!-- Calorie Ring (Left) -->
        <div class="relative w-40 h-40 flex-shrink-0">
          <!-- Using Element Plus Progress for quick win, or SVG -->
          <el-progress 
            type="dashboard" 
            :percentage="getPercent(stats.consumed, stats.target)" 
            :width="160"
            :stroke-width="12"
            color="#10b981"
          >
            <template #default>
              <div class="flex flex-col items-center">
                <span class="text-xs text-slate-400 font-medium uppercase tracking-wider">剩余热量</span>
                <span class="text-3xl font-bold text-slate-900">{{ stats.target - stats.consumed }}</span>
                <span class="text-xs text-slate-400 mt-1">千卡</span>
              </div>
            </template>
          </el-progress>
          <!-- Absolute icon decoration if needed -->
        </div>

        <!-- Macros (Right) -->
        <div class="flex-1 w-full grid grid-cols-3 gap-4">
          <!-- Protein -->
          <div class="bg-indigo-50/50 rounded-2xl p-4 flex flex-col items-center justify-center space-y-2">
             <div class="text-xs font-semibold text-indigo-900 uppercase tracking-wide">蛋白质</div>
             <el-progress 
               type="circle" 
               :percentage="getPercent(stats.protein.current, stats.protein.target)" 
               :width="60" 
               :stroke-width="6" 
               :show-text="false"
               color="#6366f1"
             />
             <div class="text-sm font-medium text-slate-700">
               {{ stats.protein.current }} / {{ stats.protein.target }}g
             </div>
          </div>

          <!-- Carbs -->
          <div class="bg-amber-50/50 rounded-2xl p-4 flex flex-col items-center justify-center space-y-2">
             <div class="text-xs font-semibold text-amber-900 uppercase tracking-wide">碳水</div>
             <el-progress 
               type="circle" 
               :percentage="getPercent(stats.carbs.current, stats.carbs.target)" 
               :width="60" 
               :stroke-width="6" 
               :show-text="false"
               color="#f59e0b"
             />
             <div class="text-sm font-medium text-slate-700">
               {{ stats.carbs.current }} / {{ stats.carbs.target }}g
             </div>
          </div>

          <!-- Fat -->
          <div class="bg-rose-50/50 rounded-2xl p-4 flex flex-col items-center justify-center space-y-2">
             <div class="text-xs font-semibold text-rose-900 uppercase tracking-wide">脂肪</div>
             <el-progress 
               type="circle" 
               :percentage="getPercent(stats.fat.current, stats.fat.target)" 
               :width="60" 
               :stroke-width="6" 
               :show-text="false"
               color="#f43f5e"
             />
             <div class="text-sm font-medium text-slate-700">
               {{ stats.fat.current }} / {{ stats.fat.target }}g
             </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Meal Sections -->
    <div class="space-y-6">
      <div v-for="meal in meals" :key="meal.id" class="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 group">
        <!-- Header -->
        <div class="p-5 flex items-center justify-between bg-white border-b border-slate-50">
          <div class="flex items-center gap-3">
             <div class="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
               <Flame class="w-5 h-5 fill-current" />
             </div>
             <div>
               <h3 class="font-bold text-lg text-slate-900">{{ meal.name }}</h3>
               <p class="text-xs text-slate-400 font-medium">{{ meal.calories }} kcal</p>
             </div>
          </div>
          <BaseButton size="sm" variant="ghost" class="rounded-full w-10 h-10 p-0" @click="openDrawer(meal.id)">
             <Plus class="w-5 h-5" />
          </BaseButton>
        </div>

        <!-- Items List -->
        <div v-if="meal.items.length > 0" class="divide-y divide-slate-50">
          <div v-for="item in meal.items" :key="item.id" class="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer">
            <div class="flex flex-col">
              <span class="font-medium text-slate-700">{{ item.name }}</span>
              <span class="text-xs text-slate-400">{{ item.portion }}</span>
            </div>
            <div class="flex items-center gap-3">
              <span class="font-bold text-slate-700 text-sm">{{ item.cal }}</span>
              <ChevronRight class="w-4 h-4 text-slate-300" />
            </div>
          </div>
        </div>
        
        <!-- Empty State -->
        <div v-else class="p-6 text-center text-slate-400 text-sm">
          暂无记录
        </div>
      </div>
    </div>

    <!-- Food Search Drawer -->
    <FoodSearchDrawer 
      :visible="showDrawer" 
      :meal-type="activeMeal" 
      @update:visible="showDrawer = $event" 
    />

  </div>
</template>

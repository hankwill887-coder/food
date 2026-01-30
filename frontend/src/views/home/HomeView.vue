<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Plus, Flame, ChevronRight, Activity } from 'lucide-vue-next'
import BaseButton from '@/components/ui/BaseButton.vue'
import * as echarts from 'echarts'

const router = useRouter()
const chartRef = ref<HTMLElement | null>(null)

// Mock Data
const todaySummary = {
  consumed: 1250,
  target: 2000,
  weight: 69.5
}

onMounted(() => {
  // Mini Chart for Weight
  if (chartRef.value) {
    const chart = echarts.init(chartRef.value)
    const option = {
      grid: { top: 5, right: 5, bottom: 5, left: 5 },
      xAxis: { show: false, data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
      yAxis: { show: false, min: 68 },
      series: [{
        data: [70.5, 70.2, 70.4, 70.0, 69.8, 69.5, 69.5],
        type: 'line',
        smooth: true,
        showSymbol: false,
        lineStyle: { width: 3, color: '#10b981' },
      }]
    }
    chart.setOption(option)
  }
})
</script>

<template>
  <div class="space-y-8">
    
    <!-- Welcome Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">早安, 张三! ☀️</h1>
        <p class="text-slate-500">又是元气满满的一天，准备好达成目标了吗？</p>
      </div>
      <div class="w-12 h-12 rounded-full bg-slate-200 overflow-hidden">
        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" />
      </div>
    </div>

    <!-- Overview Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <!-- Calories Card -->
      <div class="bg-primary-600 rounded-3xl p-6 text-white relative overflow-hidden shadow-lg shadow-primary-200">
        <div class="relative z-10">
          <div class="flex items-center gap-2 mb-4 opacity-90">
            <Flame class="w-5 h-5" />
            <span class="font-medium">今日热量</span>
          </div>
          <div class="flex items-end gap-2 mb-2">
             <span class="text-4xl font-bold">{{ todaySummary.target - todaySummary.consumed }}</span>
             <span class="text-lg opacity-80 mb-1">剩余千卡</span>
          </div>
          <div class="w-full bg-white/20 h-2 rounded-full mt-4">
            <div class="bg-white h-2 rounded-full" :style="`width: ${(todaySummary.consumed / todaySummary.target) * 100}%`"></div>
          </div>
          <p class="mt-2 text-sm opacity-80">已摄入 {{ todaySummary.consumed }} / {{ todaySummary.target }} kcal</p>
        </div>
        <!-- Decoration -->
        <Flame class="absolute -bottom-4 -right-4 w-32 h-32 text-white/10 rotate-12" />
      </div>

      <!-- Weight Card -->
      <div class="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm relative overflow-hidden cursor-pointer hover:border-primary-200 transition-colors" @click="router.push('/weight')">
        <div class="flex justify-between items-start mb-4">
          <div class="flex items-center gap-2 text-slate-500">
            <Activity class="w-5 h-5" />
            <span class="font-medium">体重趋势</span>
          </div>
          <div class="bg-green-50 text-green-700 px-2 py-1 rounded-lg text-xs font-bold">-0.3 kg</div>
        </div>
        <div class="flex items-end gap-2">
           <span class="text-3xl font-bold text-slate-900">{{ todaySummary.weight }}</span>
           <span class="text-sm text-slate-400 mb-1">kg</span>
        </div>
        <div ref="chartRef" class="w-full h-16 mt-2"></div>
      </div>

    </div>

    <!-- Quick Actions -->
    <div>
      <h2 class="text-lg font-bold text-slate-900 mb-4">快速记录</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button @click="router.push('/diary')" class="p-4 bg-white border border-slate-100 rounded-2xl flex flex-col items-center gap-2 hover:bg-slate-50 transition-colors group">
          <div class="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <span class="text-lg">🥣</span>
          </div>
          <span class="font-medium text-slate-700">早餐</span>
        </button>
        <button @click="router.push('/diary')" class="p-4 bg-white border border-slate-100 rounded-2xl flex flex-col items-center gap-2 hover:bg-slate-50 transition-colors group">
          <div class="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <span class="text-lg">🥗</span>
          </div>
          <span class="font-medium text-slate-700">午餐</span>
        </button>
        <button @click="router.push('/diary')" class="p-4 bg-white border border-slate-100 rounded-2xl flex flex-col items-center gap-2 hover:bg-slate-50 transition-colors group">
          <div class="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <span class="text-lg">🥩</span>
          </div>
          <span class="font-medium text-slate-700">晚餐</span>
        </button>
        <button @click="router.push('/weight')" class="p-4 bg-white border border-slate-100 rounded-2xl flex flex-col items-center gap-2 hover:bg-slate-50 transition-colors group">
          <div class="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Plus class="w-6 h-6" />
          </div>
          <span class="font-medium text-slate-700">记体重</span>
        </button>
      </div>
    </div>

  </div>
</template>

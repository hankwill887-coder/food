<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import * as echarts from 'echarts'
import { Plus } from 'lucide-vue-next'

const chartRef = ref<HTMLElement | null>(null)
const currentWeight = ref('')
const weightHistory = ref([
  { date: '2026-01-25', weight: 70.5 },
  { date: '2026-01-26', weight: 70.2 },
  { date: '2026-01-27', weight: 70.4 },
  { date: '2026-01-28', weight: 70.0 },
  { date: '2026-01-29', weight: 69.8 },
  { date: '2026-01-30', weight: 69.5 },
])

const initChart = () => {
  if (!chartRef.value) return
  
  const chart = echarts.init(chartRef.value)
  const appColors = { primary: '#10b981', bg: '#ecfdf5' }

  const option = {
    grid: { top: 30, right: 20, bottom: 20, left: 40, containLabel: true },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'line' },
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: '#e2e8f0',
      textStyle: { color: '#1e293b' }
    },
    xAxis: {
      type: 'category',
      data: weightHistory.value.map(i => i.date.slice(5)), // MM-DD
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#94a3b8' }
    },
    yAxis: {
      type: 'value',
      scale: true, // Don't start from 0
      splitLine: { lineStyle: { type: 'dashed', color: '#f1f5f9' } },
      axisLabel: { color: '#94a3b8' }
    },
    series: [
      {
        data: weightHistory.value.map(i => i.weight),
        type: 'line',
        smooth: true,
        symbolSize: 8,
        itemStyle: { color: appColors.primary, borderWidth: 2, borderColor: '#fff' },
        lineStyle: { width: 4, color: appColors.primary },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(16, 185, 129, 0.2)' },
            { offset: 1, color: 'rgba(16, 185, 129, 0)' }
          ])
        }
      }
    ]
  }

  chart.setOption(option)
  
  window.addEventListener('resize', () => chart.resize())
}

onMounted(() => {
  nextTick(() => initChart())
})

const addWeight = () => {
    // Logic to add weight
    console.log("Add weight", currentWeight.value)
}
</script>

<template>
  <div class="space-y-8">
    
    <!-- Input Card -->
    <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-end gap-4">
      <div class="flex-1">
        <BaseInput 
          id="weight" 
          label="Log Today's Weight" 
          type="number" 
          v-model="currentWeight" 
          placeholder="e.g. 69.5" 
        />
      </div>
      <BaseButton size="lg" class="mb-[2px]" @click="addWeight">
        <Plus class="w-5 h-5 mr-2" />
        Log Weight
      </BaseButton>
    </div>

    <!-- Chart Card -->
    <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 h-96">
      <h3 class="font-bold text-lg text-slate-900 mb-4">Weight Trend (Last 7 Days)</h3>
      <div ref="chartRef" class="w-full h-[320px]"></div>
    </div>

    <!-- History List -->
    <div class="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
      <div class="px-6 py-4 border-b border-slate-50 bg-slate-50/50">
        <h3 class="font-bold text-slate-900">Recent History</h3>
      </div>
      <div class="divide-y divide-slate-50">
        <div v-for="(entry, idx) in [...weightHistory].reverse()" :key="idx" class="px-6 py-4 flex justify-between items-center group hover:bg-slate-50 transition-colors">
          <span class="text-slate-600 font-medium">{{ entry.date }}</span>
          <div class="flex items-center gap-4">
            <span class="font-bold text-slate-900">{{ entry.weight }} kg</span>
            <div class="w-2 h-2 rounded-full" :class="idx === 0 ? 'bg-primary-500' : 'bg-slate-200'"></div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

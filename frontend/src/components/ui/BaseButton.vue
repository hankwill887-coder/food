<script setup lang="ts">
import { computed } from 'vue'
import { Loader2 } from 'lucide-vue-next'

const props = defineProps<{
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  block?: boolean
  loading?: boolean
  disabled?: boolean
}>()

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return 'bg-primary-100 text-primary-700 hover:bg-primary-200 focus:ring-primary-500/20'
    case 'outline':
      return 'border-2 border-slate-200 text-slate-700 hover:border-primary-500 hover:text-primary-600 focus:ring-primary-500/20'
    case 'ghost':
      return 'text-slate-600 hover:bg-slate-100 focus:ring-slate-500/20'
    case 'primary':
    default:
      return 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500/30'
  }
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'h-9 px-3 text-sm'
    case 'lg':
      return 'h-12 px-6 text-lg'
    case 'md':
    default:
      return 'h-11 px-4 text-base'
  }
})
</script>

<template>
  <button
    :class="[
      'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed',
      variantClasses,
      sizeClasses,
      block ? 'w-full' : ''
    ]"
    :disabled="disabled || loading"
  >
    <Loader2 v-if="loading" class="w-5 h-5 mr-2 animate-spin" />
    <slot />
  </button>
</template>

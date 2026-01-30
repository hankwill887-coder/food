<script setup lang="ts">
defineProps<{
  modelValue: string | number
  label?: string
  id: string
  type?: string
  placeholder?: string
  error?: string
}>()

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="space-y-1.5">
    <label v-if="label" :for="id" class="block text-sm font-medium text-slate-700">
      {{ label }}
    </label>
    <div class="relative">
      <input
        :id="id"
        :type="type || 'text'"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        :placeholder="placeholder"
        class="block w-full rounded-xl border-slate-200 bg-slate-50 shadow-sm focus:border-primary-500 focus:ring-primary-500 transition-colors duration-200 py-3 px-4 placeholder:text-slate-400"
        :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': error }"
      />
      <div v-if="$slots.append" class="absolute inset-y-0 right-0 flex items-center pr-3">
        <slot name="append" />
      </div>
    </div>
    <p v-if="error" class="text-sm text-red-600 mt-1">{{ error }}</p>
  </div>
</template>

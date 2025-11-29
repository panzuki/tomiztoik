<template>
  <div class="w-full fixed bottom-0 left-0 bg-gray-800 text-white flex justify-around py-2 text-sm">
    <button 
      v-for="tab in tabs"
      :key="tab.name"
      @click="selectTab(tab)"
      class="flex-1 text-center py-2"
      :class="{ 'bg-gray-700': tab.name === modelValue }"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: String, required: true },
})

const emit = defineEmits(["update:modelValue"])

const tabs = [
  { name: "shelf-create", label: "棚作成" },
  { name: "delivery", label: "納品" },
  { name: "storage-view", label: "商品棚" },
  { name: "status", label: "現状確認" }
]

const selectTab = (tab) => {
  emit("update:modelValue", tab.name)
}
</script>

<style scoped>
button {
  transition: background 0.2s ease;
}
</style>

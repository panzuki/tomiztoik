<template>
  <div class="h-screen flex flex-col">
    <div class="flex-1 overflow-auto">
      <component :is="currentTabComponent" />
    </div>
    <TabBar v-model:tab="currentTab" />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import TabBar from "./components/TabBar.vue";
import ShelfCreate from "./views/ShelfCreate.vue";
import Delivery from "./views/Delivery.vue";
import ShelfView from "./views/ShelfView.vue";

const currentTab = ref("shelfCreate");
const currentTabComponent = computed(() => {
  if (currentTab.value === "shelfCreate") return ShelfCreate;
  if (currentTab.value === "delivery") return Delivery;
  if (currentTab.value === "shelfView") return ShelfView;
});
</script>

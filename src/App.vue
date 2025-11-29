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

// components 配下を参照するように修正
import TabBar from "./components/TabBar.vue";
import ShelfCreate from "./components/ShelfCreate.vue";
import Delivery from "./components/Delivery.vue";
import ShelfView from "./components/ShelfView.vue";

const currentTab = ref("shelfCreate");

const currentTabComponent = computed(() => {
  if (currentTab.value === "shelfCreate") return ShelfCreate;
  if (currentTab.value === "delivery") return Delivery;
  if (currentTab.value === "shelfView") return ShelfView;
});
</script>

<template>
  <div class="p-4">
    <h1 class="text-xl font-bold mb-4">商品棚</h1>

    <div v-if="loading">読み込み中...</div>

    <div v-else>
      <div
        v-for="shelf in shelves"
        :key="shelf.id"
        class="border rounded p-3 mb-3 bg-white"
      >
        <div class="font-bold text-lg">{{ shelf.name }}</div>
        <div class="text-sm text-gray-500">
          {{ shelf.rows }}段 × {{ shelf.cols }}列
        </div>
        <div class="text-sm text-gray-500">
          ストッカー容量: {{ shelf.stockerWeight }}kg
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useFirebase } from "@/composables/useFirebase";
import { collection, getDocs } from "firebase/firestore";

let db;

const loading = ref(true);
const shelves = ref([]);

onMounted(async () => {
  const fb = await useFirebase();
  db = fb.db;

  const snap = await getDocs(collection(db, "shelves"));

  shelves.value = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

  loading.value = false;
});
</script>

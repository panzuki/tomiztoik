<template>
  <div class="p-4 space-y-4">
    <h1 class="text-xl font-bold">納品</h1>

    <!-- 🔍 検索バー -->
    <input
      v-model="search"
      type="text"
      placeholder="商品名 または JANコード検索"
      class="w-full p-2 border rounded"
    />

    <!-- 📦 商品一覧 -->
    <div class="max-h-60 overflow-y-auto border rounded p-2 bg-white">
      <div
        v-for="item in filteredItems"
        :key="item.jan"
        class="p-2 border-b last:border-b-0 hover:bg-blue-50"
        @click="selectItem(item)"
      >
        <div class="font-bold">{{ item.name }}</div>
        <div class="text-xs text-gray-500">{{ item.jan }}</div>
      </div>
    </div>

    <!-- 📄 選択した商品 -->
    <div v-if="selectedItem" class="p-4 border rounded bg-gray-50">

      <div class="font-bold text-lg">{{ selectedItem.name }}</div>
      <div class="text-sm text-gray-600">JAN: {{ selectedItem.jan }}</div>

      <div class="mt-4 space-y-3">

        <div>
          <label>数量</label>
          <input v-model.number="qty" type="number" min="1" class="w-full p-2 border rounded" />
        </div>

        <div>
          <label>賞味期限</label>
          <input v-model="exp" type="date" class="w-full p-2 border rounded" />
        </div>

        <div>
          <label>ロット</label>
          <input v-model="lot" type="text" class="w-full p-2 border rounded" />
        </div>

        <button @click="register" class="w-full bg-blue-600 text-white p-3 rounded">
          登録
        </button>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useFirebase } from "@/composables/useFirebase.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const items = ref([
  // ↓↓↓ あなたが提示した「商品名 + JANコード」リストをここに入れる ↓↓↓
  { name: "【有機JAS】オートミール / 500g", jan: "4532416700015" },
  { name: "cuocaしっとりチョコ食パンミックス（袋入） / 1kg", jan: "4932503957429" },
  { name: "cuocaスコーンミックス / 1kg", jan: "4571182552138" },
  // ……（略：あなたの全商品リストをここに入れる）
]);
const search = ref("");
const selectedItem = ref(null);

const qty = ref(1);
const exp = ref("");
const lot = ref("");

let db;
useFirebase().then(fb => db = fb.db);

// 絞り込み
const filteredItems = computed(() => {
  const q = search.value.toLowerCase();
  return items.value.filter(
    (i) =>
      i.name.toLowerCase().includes(q) ||
      i.jan.includes(q)
  );
});

const selectItem = (item) => {
  selectedItem.value = item;
};

const register = async () => {
  if (!selectedItem.value) return;

  await addDoc(collection(db, "deliveries"), {
    name: selectedItem.value.name,
    jan: selectedItem.value.jan,
    qty: qty.value,
    exp,
    lot,
    createdAt: serverTimestamp(),
  });

  alert("登録しました");

  selectedItem.value = null;
  qty.value = 1;
  exp.value = "";
  lot.value = "";
};
</script>

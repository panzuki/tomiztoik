<template>
  <div class="p-4">
    <h2 class="text-lg font-bold">棚作成</h2>
    <div>
      <button @click="addShelf">棚を追加</button>
      <div v-for="(shelf, sIdx) in storages" :key="shelf.id" class="mt-2 p-2 border">
        <h3>{{ shelf.type }} - {{ shelf.id }}</h3>
        <div v-for="(row, rIdx) in shelf.rows" :key="rIdx" class="flex space-x-2 mt-1">
          <div
            v-for="(cell, cIdx) in row.cells"
            :key="cIdx"
            class="border p-2 text-center cursor-pointer"
            @click="onCellClick(sIdx, rIdx, cIdx)"
          >
            {{ getCellLabel(sIdx, rIdx, cIdx) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const storages = reactive([]);

const addShelf = () => {
  storages.push({
    id: `棚${storages.length + 1}`,
    type: "商品棚（ストッカー付き）",
    rows: [
      { cols: 3, role: "商品棚", cells: Array(3).fill({ product: null, qty: 0, maxQty: 10 }) },
      { cols: 3, role: "ストッカー", cells: Array(3).fill({ product: null, weight: 0, maxWeight: 20 }) }
    ]
  });
};

const onCellClick = (sIdx, rIdx, cIdx) => {
  const cell = storages[sIdx].rows[rIdx].cells[cIdx];
  if (!cell.product) return;
  if (storages[sIdx].rows[rIdx].role === "ストッカー") {
    cell.weight++;
    if (cell.weight > cell.maxWeight) cell.weight = 0;
  } else {
    cell.qty++;
    if (cell.qty > cell.maxQty) cell.qty = 0;
  }
};

const getCellLabel = (sIdx, rIdx, cIdx) => {
  const cell = storages[sIdx].rows[rIdx].cells[cIdx];
  if (!cell.product) return "-";
  return storages[sIdx].rows[rIdx].role === "ストッカー" ? `${cell.product.title}\n${cell.weight}kg` : `${cell.product.title}\n${cell.qty}`;
};
</script>

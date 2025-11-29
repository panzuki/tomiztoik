<template>
  <div class="p-4 pb-20">

    <!-- タイトル -->
    <h1 class="text-xl font-bold mb-4">棚作成</h1>

    <!-- 棚名 -->
    <div class="mb-4">
      <label class="font-semibold">棚名</label>
      <input v-model="form.name" type="text" class="input-text" placeholder="例: 棚A" />
    </div>

    <!-- タイプ -->
    <div class="mb-4">
      <label class="font-semibold">棚のタイプ</label>
      <select v-model="form.type" class="input-text">
        <option value="商品棚">商品棚</option>
        <option value="ストッカー付き">ストッカー付き</option>
        <option value="倉庫">倉庫</option>
      </select>
    </div>

    <!-- 段追加 -->
    <div class="mb-4">
      <button class="btn-primary" @click="addRow">段を追加</button>
    </div>

    <!-- 段リスト -->
    <div v-for="(row, rowIndex) in form.rows" :key="row.id"
         class="border p-3 mb-3 bg-gray-50 rounded">
      <div class="flex justify-between">
        <h2 class="font-semibold">段 {{ rowIndex + 1 }}</h2>
        <button class="text-red-500 text-sm" @click="removeRow(rowIndex)">削除</button>
      </div>

      <div class="mt-2 ml-4">
        <button class="btn-secondary mb-2" @click="addCell(row)">セル追加</button>

        <div v-for="(cell, cellIndex) in row.cells" 
             :key="cell.id"
             class="flex items-end gap-3 mb-2">

          <span>セル {{ cellIndex + 1 }}</span>

          <!-- 上限個数 -->
          <div>
            <label class="text-xs block">上限(個)</label>
            <input type="number" v-model.number="cell.maxQty" class="w-20 input-text" />
          </div>

          <!-- 重量上限（ストッカー用） -->
          <div>
            <label class="text-xs block">上限(kg)</label>
            <input type="number" v-model.number="cell.maxWeight" class="w-20 input-text" />
          </div>

          <button class="text-red-500 text-xs" @click="removeCell(row, cellIndex)">削除</button>
        </div>

      </div>
    </div>

    <!-- 保存 -->
    <div class="mt-6">
      <button class="btn-primary w-full" @click="saveShelf">棚を保存</button>
    </div>

  </div>
</template>

<script setup>
import { reactive } from "vue"
import { useFirebase } from "../composables/useFirebase"

const { addDocument } = useFirebase()

// ===== 柔軟棚作成フォーム =====
const form = reactive({
  name: "",
  type: "商品棚",
  rows: []   // { id, index, cells: [ {id, maxQty, maxWeight} ] }
})

// 段追加
const addRow = () => {
  form.rows.push({
    id: crypto.randomUUID(),
    cells: []
  })
}

// 段削除
const removeRow = (i) => {
  form.rows.splice(i, 1)
}

// セル追加
const addCell = (row) => {
  row.cells.push({
    id: crypto.randomUUID(),
    maxQty: null,
    maxWeight: null
  })
}

// セル削除
const removeCell = (row, cellIndex) => {
  row.cells.splice(cellIndex, 1)
}


// ===== Firebase 保存 =====
const saveShelf = async () => {
  const storage = {
    id: crypto.randomUUID(),
    name: form.name,
    type: form.type,
    rows: form.rows.map((r, idx) => ({
      id: r.id,
      index: idx,
      cells: r.cells.map(c => ({
        id: c.id,
        maxQty: c.maxQty ?? null,
        maxWeight: c.maxWeight ?? null,
        batches: []  // 初期は空
      }))
    }))
  }

  await addDocument("storages", storage)
  alert("棚を保存しました")
}
</script>

<style scoped>
.input-text {
  @apply border border-gray-300 rounded px-2 py-1 w-full;
}
.btn-primary {
  @apply bg-blue-600 text-white px-4 py-2 rounded;
}
.btn-secondary {
  @apply bg-gray-300 text-gray-900 px-3 py-1 rounded;
}
</style>

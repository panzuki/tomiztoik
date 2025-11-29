<template>
  <div class="flex justify-around bg-gray-100 p-2 border-t">
    <button @click="$emit('update:tab', 'shelfCreate')">棚作成</button>
    <button @click="$emit('update:tab', 'delivery')">納品</button>
    <button @click="$emit('update:tab', 'shelfView')">商品棚</button>
  </div>
</template>

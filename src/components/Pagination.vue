<template>
  <div class="flex justify-end mt-2.5">
    <el-pagination
      background
      layout="total, prev, pager, next"
      @current-change="handleChange"
      :total="total"
      :current-page="currentPage"
    />
  </div>
</template>
<script lang="ts" setup>
defineProps<{
  total: number;
  currentPage: number;
  handleChange: (index: number) => void;
}>();
</script>

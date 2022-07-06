<template>
  <el-card>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="(item, index) in $route.matched"
        :key="index"
        :to="{ path: item.path }"
      >
        {{ item.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </el-card>
</template>
<script lang="ts" setup></script>

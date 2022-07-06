<template>
  <el-container class="w-full h-full min-h-[720px] !flex-col">
    <Header />
    <el-container class="overflow-hidden">
      <el-aside class="!w-[200px]">
        <Menu />
      </el-aside>
      <el-container class="!flex-col">
        <el-main class="overflow-hidden h-full">
          <Breadcrumb />
          <router-view v-slot="{ Component }">
            <component :is="Component" />
          </router-view>
        </el-main>
        <Footer />
      </el-container>
    </el-container>
  </el-container>
</template>
<script lang="ts" setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Menu from "@/components/Menu.vue";
import Breadcrumb from "./Breadcrumb.vue";
</script>

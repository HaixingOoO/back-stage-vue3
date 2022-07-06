<script setup lang="ts">
import zhCn from "element-plus/lib/locale/lang/zh-cn";
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view v-slot="{ Component }">
      <transition name="bounce">
        <component :is="Component" />
      </transition>
    </router-view>
  </el-config-provider>
</template>
<style>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0.75);
  }
  100% {
    transform: scale(1);
  }
}
</style>

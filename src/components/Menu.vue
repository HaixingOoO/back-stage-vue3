<template>
  <el-menu :default-active="$route.name" class="h-full">
    <template v-for="(item, index) in menus">
      <el-sub-menu
        :index="index + ''"
        :key="index + ''"
        v-if="item.meta && !item?.meta?.hidden"
      >
        <template #title>
          <el-icon>
            <component :is="item.meta.icon" />
          </el-icon>
          <span>{{ item.meta.name }}</span>
        </template>
        <template v-if="item.children">
          <el-menu-item-group>
            <router-link
              v-for="children in item.children"
              :to="children.path"
              :key="children.name"
            >
              <el-menu-item :index="children.name">
                {{ children?.meta?.name }}
              </el-menu-item>
            </router-link>
          </el-menu-item-group>
        </template>
      </el-sub-menu>
    </template>
  </el-menu>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { RouteRecordRaw, useRouter } from "vue-router";
const router = useRouter();
const menus = ref<RouteRecordRaw[]>([]);
menus.value = router.options.routes;
</script>

<template>
  <!-- table -->
  <el-table
    row-key="id"
    :data="tableData"
    border
    v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-text="Loading..."
    element-loading-background="rgba(0, 0, 0, 0.7)"
  >
    <el-table-column prop="id" label="用户ID" />
    <el-table-column prop="userId" label="所属班级" />
    <el-table-column prop="title" label="作业名称" />
    <el-table-column prop="completed" label="完成情况">
      <template #default="scope">
        {{ scope.row.completed ? "是" : "否" }}
      </template>
    </el-table-column>
    <!-- <el-table-column
        prop="handle"
        align="center"
        fixed="right"
        label="操作"
        width="150"
      >
        <template #default="scope">
          <el-button type="primary" @click="handleEdit(scope.row)">
            <el-icon>
              <Edit />
            </el-icon>
          </el-button>
          <el-button type="danger" @click="handleDelete(scope.row.id)">
            <el-icon>
              <Delete />
            </el-icon>
          </el-button>
        </template>
      </el-table-column> -->
  </el-table>
  <Pagination v-bind="{ total, currentPage, handleChange }" />
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { workinfo, Iworkinfo } from "../../api";

interface TableData {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

const tableData = ref<TableData[]>([]);
const total = ref(0);
const currentPage = ref(1);
const fullscreenLoading = ref(false);

const getData = async ({ page, size }: Iworkinfo) => {
  try {
    fullscreenLoading.value = true;
    const { data } = await workinfo({ page, size });
    if (data.status === 200) {
      tableData.value = data.data;
      total.value = data.total;
      console.log(data);
    }
  } catch (error) {
    throw new Error(error as string);
  } finally {
    fullscreenLoading.value = false;
  }
};

onMounted(() => {
  getData({ page: currentPage.value, size: 10 });
});

// 切换分页
const handleChange = (index: number) => {
  currentPage.value = index;
  getData({ page: currentPage.value, size: 10 });
};
</script>

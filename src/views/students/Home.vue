<template>
  <div
    class="mt-5"
    v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-text="Loading..."
    element-loading-background="rgba(0, 0, 0, 0.7)"
    style="height: calc(100% - 86px)"
  >
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="姓名:">
        <el-input v-model="formInline.name" placeholder="请输入名称关键词" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table row-key="id" :data="dataComputed" border>
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="age" label="年龄" />
      <el-table-column prop="sex" label="性别" />
      <el-table-column prop="number" label="学号" />
      <el-table-column prop="class" label="班级" />
      <el-table-column prop="state" label="状态" />
      <el-table-column prop="address" label="地址" width="180" />
      <el-table-column prop="phone" label="手机号码" width="120" />
      <el-table-column
        prop="handle"
        align="center"
        fixed="right"
        label="操作"
        width="100"
      >
        <template #default="scope">
          <el-button type="danger" @click="handleDelete(scope.row.id)">
            <el-icon>
              <Delete />
            </el-icon>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination v-bind="{ total, currentPage, handleChange }" />
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, computed, reactive } from "vue";
import { Delete } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import Pagination from "@/components/Pagination.vue";
import { students, deleteStudents } from "../../api";

const tableData = ref([]);
const total = ref(0);
const currentPage = ref(1);
const fullscreenLoading = ref(false);

// 获取数据
const getStudents = async (params?: { name: string }) => {
  try {
    fullscreenLoading.value = true;
    const { data } = await students(params);
    if (data.status === 200) {
      const students = data.data;
      total.value = data.total;
      tableData.value = students.map((item: any) => {
        if (item.sex === 1) {
          item.sex = "男";
        } else {
          item.sex = "女";
        }
        if (item.state === "1") {
          item.state = "已入学";
        } else if (item.state === "2") {
          item.state = "未入学";
        } else {
          item.state = "休学中";
        }
        return item;
      });
    } else {
      ElMessage({
        message: "获取数据失败",
        type: "error",
      });
    }
  } catch (error) {
    throw new Error(error as string);
  } finally {
    fullscreenLoading.value = false;
  }
};

// 删除数据
const handleDelete = async (id: number) => {
  try {
    fullscreenLoading.value = true;
    const { data } = await deleteStudents(id);
    if (data.status === 200) {
      ElMessage({
        message: "数据删除成功",
        type: "success",
      });
      getStudents();
    }
  } catch (error) {
    throw new Error(error as string);
  } finally {
    fullscreenLoading.value = false;
  }
};

// 切换分页
const handleChange = (index: number) => {
  currentPage.value = index;
};

onMounted(() => {
  getStudents();
});

// 计算分页
const dataComputed = computed(() => {
  return tableData.value.slice(
    (currentPage.value - 1) * 10,
    currentPage.value * 10
  );
});

// 查询
const formInline = reactive({
  name: "",
});

const onSubmit = () => {
  getStudents({ name: formInline.name });
};

const onReset = () => {
  formInline.name = "";
  getStudents();
};
</script>

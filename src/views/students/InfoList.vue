<template>
  <div
    class="mt-5"
    v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-text="Loading..."
    element-loading-background="rgba(0, 0, 0, 0.7)"
    style="height: calc(100% - 86px)"
  >
    <el-button class="mb-5" type="primary" @click="dialogFormVisible = true">
      新增
    </el-button>
    <!-- Edit -->
    <el-dialog
      v-model="dialogFormVisible"
      @close="handleCancel"
      :title="`${Title === 1 ? '添加学生信息' : '修改学生信息'}`"
    >
      <el-form
        ref="ruleFormRef"
        :rules="rules"
        :model="form"
        :label-width="formLabelWidth"
      >
        <el-form-item label="姓名:" prop="name">
          <el-input
            v-model="form.name"
            autocomplete="off"
            placeholder="请输入姓名"
          />
        </el-form-item>
        <el-form-item label="性别:" prop="sex">
          <el-radio-group v-model="form.sex">
            <el-radio label="1">男</el-radio>
            <el-radio label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄:" prop="age">
          <el-input
            v-model="form.age"
            autocomplete="off"
            placeholder="请输入年龄"
          />
        </el-form-item>
        <el-form-item label="父亲姓名:" prop="father">
          <el-input
            v-model="form.father"
            autocomplete="off"
            placeholder="请输入父亲姓名"
          />
        </el-form-item>
        <el-form-item label="母亲姓名:" prop="mather">
          <el-input
            v-model="form.mather"
            autocomplete="off"
            placeholder="请输入母亲姓名"
          />
        </el-form-item>
        <el-form-item label="家庭住址:" prop="address">
          <el-input
            v-model="form.address"
            autocomplete="off"
            placeholder="请输入家庭住址"
          />
        </el-form-item>
        <el-form-item label="入校时间:" prop="time">
          <el-date-picker
            v-model="form.time"
            type="date"
            placeholder="选择时间"
            format="YYYY年MM月DD日"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="手机:" prop="phone">
          <el-input
            v-model="form.phone"
            autocomplete="off"
            placeholder="请输入手机号码"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleCancel">关闭</el-button>
          <el-button type="primary" @click="handleSubmit(ruleFormRef)"
            >提交</el-button
          >
        </span>
      </template>
    </el-dialog>
    <!-- table -->
    <el-table row-key="id" :data="tableData" border>
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="sex" label="性别">
        <template #default="scope">
          {{ scope.row.sex === "1" ? "男" : "女" }}
        </template>
      </el-table-column>
      <el-table-column prop="age" label="年龄" />
      <el-table-column prop="father" label="父亲" />
      <el-table-column prop="mather" label="母亲" />
      <el-table-column prop="address" label="家庭住址" />
      <el-table-column prop="time" label="入校时间" width="180" />
      <el-table-column prop="phone" label="联系方式" width="120" />
      <el-table-column
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
      </el-table-column>
    </el-table>
    <Pagination v-bind="{ total, currentPage, handleChange }" />
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, reactive } from "vue";
import { Delete, Edit } from "@element-plus/icons-vue";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import Pagination from "@/components/Pagination.vue";
import { info, InfoData, deleteInfo, handleInfo } from "../../api";

const tableData = ref<InfoData[]>([]);
const total = ref(0);
const currentPage = ref(1);
const fullscreenLoading = ref(false);

// 获取数据
const getStudents = async (params?: { name: string }) => {
  try {
    fullscreenLoading.value = true;
    const { data } = await info(params);
    if (data.status === 200) {
      tableData.value = data.data;
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

// 切换分页
const handleChange = (index: number) => {
  currentPage.value = index;
  getStudents();
};

onMounted(() => {
  getStudents();
});

// form表单
let form = reactive<InfoData>({
  name: "",
  age: "",
  sex: "1",
  father: "",
  mather: "",
  time: "",
  address: "",
  phone: "",
});
const dialogFormVisible = ref(false);
const rules = reactive<FormRules>({
  name: [
    { required: true, message: "请输入姓名", trigger: "blur" },
    { min: 2, max: 5, message: "2-5个字", trigger: "blur" },
  ],
  age: [
    {
      required: true,
      message: "请输入年龄",
      trigger: "blur",
    },
    {
      max: 3,
      min: 0,
      message: "年龄不能大于三位数",
      trigger: "blur",
    },
  ],
  father: {
    required: true,
    message: "请输入姓名",
    trigger: "blur",
  },
  mather: {
    required: true,
    message: "请输入姓名",
    trigger: "blur",
  },
  address: {
    required: true,
    message: "请输入地址",
    trigger: "blur",
  },
  time: {
    type: "date",
    required: true,
    message: "请选择时间",
    trigger: "change",
  },
  phone: {
    required: true,
    message: "请输入手机号码",
    trigger: "blur",
  },
});
const ruleFormRef = ref<FormInstance>();

const formLabelWidth = "100px";

const Title = ref(1);

//修改数据
const handleDelete = async (id: string) => {
  try {
    fullscreenLoading.value = true;
    const { data } = await deleteInfo(id);
    if (data.status === 200) {
      getStudents();
    }
  } catch (error) {
    throw new Error(error as string);
  } finally {
    dialogFormVisible.value = false;
  }
};

const handleCancel = () => {
  ruleFormRef.value?.resetFields();
  dialogFormVisible.value = false;
};

const handleSubmit = async (ruleFormRef: FormInstance | undefined) => {
  try {
    if (!ruleFormRef) return;
    await ruleFormRef.validate(async (valid, fields) => {
      if (valid) {
        fullscreenLoading.value = true;
        let method = Title.value === 1 ? "post" : "put";
        const { data } = await handleInfo(method, form);
        if (data.status === 200) {
          ElMessage({
            message: data.message,
            type: "success",
          });
          getStudents();
          dialogFormVisible.value = false;
        }
      } else {
        console.log("error submit!", fields);
      }
    });
  } catch (error) {
    throw new Error(error as string);
  }
};
const handleEdit = (row: InfoData) => {
  form = Object.assign(form, row);
  Title.value = 2;
  dialogFormVisible.value = true;
};
</script>

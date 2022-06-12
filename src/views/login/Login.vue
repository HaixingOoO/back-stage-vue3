<template>
  <div class="flex justify-center items-center h-screen">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      class="w-[400px]"
    >
      <el-form-item label="账号:" prop="username">
        <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input
          v-model="ruleForm.password"
          type="password"
          show-password
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          class="w-full"
          type="primary"
          @click="submitForm(ruleFormRef)"
          >login</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance } from "element-plus";

const ruleFormRef = ref<FormInstance>();

const validateName = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入账号"));
  } else if (value.length < 4 || value.length > 10) {
    callback(new Error("长度在4-10位字符串之间"));
  } else {
    callback();
  }
};
const validatePwd = (rule: any, value: any, callback: any) => {
  let reg =
    /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]/;
  if (value === "") {
    callback(new Error("请输入密码"));
  } else if (!reg.test(value)) {
    callback(new Error("大写字母，小写字母，数字，特殊符号任意三项密码"));
  } else {
    callback();
  }
};

const ruleForm = reactive({
  username: "",
  password: "",
});

const rules = reactive({
  username: [{ validator: validateName, trigger: "blur" }],
  password: [{ validator: validatePwd, trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log(ruleForm);
      console.log("submit!");
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
</script>

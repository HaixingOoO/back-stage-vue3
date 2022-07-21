<template>
  <div class="flex justify-center items-center h-screen">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      class="w-[400px]"
      @keyup.enter.native="submitForm(ruleFormRef)"
    >
      <el-form-item label="账号:" prop="username">
        <el-input
          v-model="ruleForm.username"
          type="text"
          autocomplete="off"
          autofocus
        />
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
          :loading="loading"
          >login</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { setSession } from "../../utils";
import { useRouter } from "vue-router";
import { useStore } from "../../store/useStore";
import { login } from "../../api";

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

const router = useRouter();
const store = useStore();

const ruleForm = reactive({
  username: "",
  password: "",
});

const loading = ref(false);

const rules = reactive({
  username: [{ validator: validateName, trigger: "blur" }],
  password: [{ validator: validatePwd, trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    try {
      loading.value = true;
      if (valid) {
        const { data } = await login(ruleForm);
        if (data.status === 200) {
          setSession("token", data.token);
          setSession("login", true);
          store.toggleLogin(true);
          router.push("/");
          ElMessage({
            message: "登录成功",
            type: "success",
          });
        } else {
          ElMessage({
            message: "登录失败",
            type: "error",
          });
        }
      } else {
        console.log("error submit!");
      }
    } catch (error) {
      ElMessage({
        message: "error:" + error,
        type: "error",
      });
    } finally {
      loading.value = false;
    }
  });
};
</script>

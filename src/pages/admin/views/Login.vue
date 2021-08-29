<template>
  <div class="login" style="">
    <div class="login-box">
      <el-form ref="formRef" :model="form" :rules="rules" class="">
        <img style="width: 60%; margin: 10px 20%" src="@/assets/image/qin.png" />
        <a
          href="javascript:;"
          style="text-align: center; display: block; margin: 0px 0 30px 0"
          >后台管理系统</a
        >
        <el-form-item prop="name">
          <el-input type="text" placeholder="请输入账号" v-model="form.name" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="form.password"
          />
        </el-form-item>
        <el-button
          type="primary"
          class="login-btn"
          style="width: 100%"
          v-on:click="onSubmit('loginForm')"
          >登录</el-button
        >
      </el-form>
    </div>
  </div>
</template>
<script>
import user from "@/api/admin/user"
import { useStore } from 'vuex';
import router from '@/pages/admin/router'
import {ref,reactive,unref} from "vue"
import { ElNotification,ElMessage } from 'element-plus';
import jwt_decode from "jwt-decode";
export default {
  name: "Login",
  setup(){
    const store = useStore();
    // 如果当前已经登录，直接跳转到index页面
    if (store.state.user.token!="") {
      store.commit("userInfo",jwt_decode(store.state.user.token))
      router.push("/home/index");
      console.log(store.state.user);
    }
    /**
     * data部分
     */
    const formRef = ref(null);
    const form = reactive({
      type: "name",
      name: "",
      password: "",
    });
    // 表单验证，需要在 el-form-item 元素中增加 prop 属性
    const rules = reactive({
      name: [
        { required: true, message: "账号不可为空", trigger: "blur" },
        {
          min: 3,
          max: 10,
          message: "账号长度在 3 到 10个字符",
          trigger: "blur",
        },
      ],
      password: [
        { required: true, message: "密码不可为空", trigger: "blur" },
        {
          min: 3,
          max: 20,
          message: "密码长度在 3 到 20个字符",
          trigger: "blur",
        },
      ],
    });

    /**
     * method 部分
     */
    const onSubmit = async ()=>{

      // 为表单绑定验证功能
      let form = unref(formRef);
      if(!form)return
      try{
          await form.validate();
          //如果验证通过就将信息传递
          login(form.model);
      }catch(error){
        ElNotification.warning({
          title:"信息错误",
          message:"账户名或密码不符规范",
          duration: 1000,
        })
      }
    };
    const login = (formdata)=>{
      // let that = this;
      //     that.$store.dispatch("setToken", "response.data.token");
      //     that.$message({
      //       message: "登录成功",
      //       type: "success",
      //     });
      //     that.$store.dispatch("userInfo");
      //     that.$router.push("/home/index");
          user.AdminLogin(formdata).then((response)=>{
            /**
             * 将 token写入内存
             */
            store.dispatch("setToken",response.data.token)
            //成功的用户反馈
            ElMessage.success({
              title:"登录成功",
              message:"管理员，欢迎登录",
              duration: 1000,
            })
            store.dispatch("userInfo",response.data.user)
            //跳转到主页面
            router.push("/home/index")
          })
      };
      return {
        rules,
        form,
        formRef,
        onSubmit,
        login
      }
    }
};
</script>


<style lang="scss" scoped>
// @import '@/assets/style/home.styl';

.login {
  // background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
  width: 100%;
  height: 100vh;
  background-image: url('https://p.pstatp.com/origin/1376f0000c17f069b879d'); // p.pstatp.com/origin/1376f0000c17f069b879d);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-box {
  // position:fixed
  // top: 0px;
  // left: 0px;
  // right: 0px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(2px);
  width: 300px;
  border-radius: 5px;
  padding: 40px 20px;
  box-shadow: 0 28px 50px rgba(25, 24, 40, 0.35);
  // box-shadow: 0 0 25px #ccc;
}

.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
}

.login-btn {
  background-image: linear-gradient(270deg, var(--main-8), var(--main-6));
}

@media (max-width: 700px) {
  .login-box {
    width: 90%;
    margin: auto 5%;
    box-sizing: border-box;
  }
}
</style>
<template>
  <teleport to="body">
    <transition name="fade">
			<div class="login-modal login" v-show="$store.state.index.showSign">
				<div class="login-mask"></div>
        <div class="sign-wrap">
        <el-row class="row">
          <el-col :xl="6" :md="8" :sm="12" :xs="22" class="login-con blog-animation">
              <span class="close iconfont icon-guanbi" @click="close"></span>
              <div class="login-img">
              <img src="~@/assets/qin.png" />
              </div>
              <p class="login-welcome">欢迎注册！</p>
              <el-form :model="formCustom" status-icon :rules="rules" ref="formCustom">
              <el-form-item prop="name">
                  <el-input
                  prefix-icon="el-icon-user"
                  type="text"
                  placeholder="用户名(字母、数字、文字)"
                  v-model="formCustom.name"
                  autocomplete="off"
                  ></el-input>
              </el-form-item>
              <el-form-item prop="password">
                  <el-input
                  prefix-icon="el-icon-lock"
                  type="password"
                  placeholder="密码"
                  v-model="formCustom.password"
                  autocomplete="off"
                  ></el-input>
              </el-form-item>
              <el-form-item prop="checkPass">
                  <el-input
                  prefix-icon="el-icon-lock"
                  type="password"
                  placeholder="确认密码"
                  v-model="formCustom.checkPass"
                  autocomplete="off"
                  ></el-input>
              </el-form-item>
              <el-form-item prop="email">
                  <el-autocomplete
                  style="width:100%"
                  prefix-icon="el-icon-message"
                  type="email"
                  placeholder="邮箱地址"
                  v-model="formCustom.email"
                  autocomplete="off"
                  :fetch-suggestions="querySearch"
                  :trigger-on-focus="false"
                  ></el-autocomplete>
              </el-form-item>
              <div class="login-btn">
                  <el-tooltip class="item" effect="light" content="温馨提示：该操作会发送邮件到该邮箱，请确保正确！" placement="top">
                  <el-button v-loading="loading" class="btn" @click="login('formCustom')">注册</el-button>
                  </el-tooltip>
                  <div class="a-tag user">
                  <a @click="showLogDia">找回密码</a>
                  <a @click="showLogDia">立即登录</a>
                  </div>
              </div>
              </el-form>
          </el-col>
          </el-row>
        </div>

    </div>
    </transition>
  </teleport>
</template>

<script>

import { useStore } from 'vuex';
export default {
  name: "Sign",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.formCustom.checkPass !== "") {
          this.$refs.formCustom.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.formCustom.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      restaurants: [],
      formCustom: {
        name: "",
        password: "",
        checkPass: "",
        email: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "change" },
          {
            min: 2,
            max: 20,
            message: "账号长度在 2到 20 个字符",
            trigger: "change",
          },
        ],
        password: [
          { validator: validatePass, trigger: "change" },
          { required: true, message: "请输入密码", trigger: "change" },
          {
            min: 6,
            max: 20,
            message: "密码长度在 6到 20 个字符",
            trigger: "change",
          },
        ],
        checkPass: [
          { validator: validatePass2, trigger: "change" },
          { required: true, message: "请输入确认密码", trigger: "change" },
          {
            min: 6,
            max: 20,
            message: "长度在 6到 20 个字符",
            trigger: "change",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "change" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["change", "change"],
          },
        ],
        // phone: [
        //   { required: false, message: "请输入手机号", trigger: "change" },
        //   {
        //     min: 11,
        //     max: 11,
        //     message: "请输入正确11位手机号",
        //     trigger: "change",
        //   },
        // ],
      },
    };
  },
  setup(){
    const store = useStore();
    const showLogDia = ()=>{
      store.commit("closeSignDia")
      store.commit("showLogDia")
    };
    const close = ()=>{
      store.commit("closeSignDia")
    }

    return{
      close,
      showLogDia
    }
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let that = this;
          if (!that.loading) {
            that.loading = true;
            this.$post("/apis/sign", this.formCustom)
              .then(function (response) {
                that.loading = false;
                that.$router.push("/login");
                that.$message({
                  showClose: true,
                  message: response.message,
                  type: "success",
                });
              })
              .catch(function () {
                that.loading = false;
              });
          } else {
            that.$message({
              showClose: true,
              message: "正在注册中……",
              type: "success",
            });
          }
        } else {
          this.$notify.error({
            title: "错误",
            message: "按照提示正确填写信息",
          });
          return false;
        }
      });
    },
    querySearch(queryString, callback) {
      let restaurants = this.restaurants;
      let results = JSON.parse(JSON.stringify(restaurants)); //把数组的浅复制换成深复制
      for (let item in results) {
        results[item].value =
          queryString.split("@")[0] + "" + restaurants[item].value;
      }
      callback(results);
    },
    loadAll() {
      return [
        { value: "@qq.com" },
        { value: "@126.com" },
        { value: "@163.com" },
        { value: "@sohu.com" },
      ];
    },
  },
  mounted() {
    this.restaurants = this.loadAll();
  },
};
</script>
<style lang="scss" scoped>

.login-modal {
	.login-mask {
	position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.45);
	}
	.login-wrap {
		position: fixed;
    display: flex;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    overflow: auto;
    outline: 0;
    align-items: center;
    justify-content: center;
  }
}
.login{
    min-height: 100vh;
    background-image: url(https://p.pstatp.com/origin/feca0003544cbfdb49bd);
    background-repeat: no-repeat;
    background-position: center;
    background-size:cover;
    .row{
        position: fixed;
        display: flex;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1000;
        overflow: auto;
        outline: 0;
        align-items: center;
        justify-content: center;
      
      .login-con{
          max-width:400px;
          padding: 10px 20px;
          transition: all .6s;
          margin-top:50px;
          margin-bottom :50px;
          border-radius:12px;
          border: 1px solid rgba(255,255,255,0.4);
          background: rgba(255,255,255,1);
          box-shadow: 0 28px 50px rgba(25,24,40,.35);
          .login-img{
              width: 60%; 
              margin: 10px 20%;
          }
          .login-welcome{
              text-align: center;
              color:var(--main-6);
              line-height: 30px;
              margin-bottom: 10px;
              font-weight: bold;
              letter-spacing: 3px;
              // font-family: '微软雅黑';
          }
          .login-btn{
              text-align: center;
              .user{
                  font-size: 14px;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  padding:0 5px;
              }
          }
          .login-btn  button{
              width:100%;
              height:40px;
              background-image:linear-gradient(270deg,rgba(142, 239, 252,0.9),rgba(142, 197,252, 0.6));
              color:#fff;
              margin:20px 0;
          }
          .login-btn button:hover{
              border: 1px solid #fff;
              background-image:linear-gradient(270deg,rgba(142, 197,252, 0.6),rgba(142, 239, 252,0.9));
          }
      }
    }
}
.close{
  float:right;
  cursor: pointer;
  &:hover{
    color: #bbb;
  }
}
.a-tag a:hover {
    cursor: pointer;
    background-image: linear-gradient(90deg, var(--main-3), var(--main-5));
    background-clip: text;
    -webkit-text-fill-color: transparent;
    box-decoration-break: clone;
}

.a-tag a:hover:after {
    left: 0;
    width: 100%;
}

.a-tag a:after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 0;
    height: 1px;
    width: 0;
    background-color: var(--main-6);
    background-image: linear-gradient(270deg, var(--main-5), var(--main-3));
    transition: all .2s ease-in-out;
}
</style>
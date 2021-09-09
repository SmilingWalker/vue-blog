<template>
  <teleport to="body">
    <transition name="fade">
			<div class="login-modal" v-show="$store.state.index.showLogin">
				<div class="login-mask"></div>
				<div class="login-wrap">
					<div class="login concise">
						<span class="close iconfont icon-guanbi" @click="close"></span>
						<p class="title" >欢迎到访，请登录</p>
						<div class="alert">
							<span class="iconfont icon-jinggao"></span>
								为防止恶意的注册登录和评论，目前本站只提供第三方登录，取消账号密码登录
						</div>
        <el-form class="logform" :model="formCustom" status-icon :rules="rules" ref="formCustomRef">
          <el-form-item prop="name">
            <el-input
              prefix-icon="el-icon-user"
              type="text"
              v-model="formCustom.name"
              placeholder="用户名"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              prefix-icon="el-icon-lock"
              type="password"
              v-model="formCustom.password"
              placeholder="密码"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <div class="login-btn">
            <el-button v-loading="loading" class="btn" @click="login">登录</el-button>
            <div class="a-tag user">
              <a @click="showSign" >立即注册</a>
              <a >找回密码</a>
            </div>
             <el-divider>第三方登录</el-divider>
          </div>
          
        </el-form>
						<div class="mode">
							<span title="QQ" @click="ThirdPartyLogin('qq')" class="item qq">
								<i class="iconfont icon-qq"></i>
							</span>
							<span title="github" @click="ThirdPartyLogin('github')" class="item github">
								<i class="iconfont icon-github"></i>
							</span>
							<span title="gitee" @click="ThirdPartyLogin('gitee')" class="item gitee">
								<i class="iconfont icon-gitee2"></i>
							</span>
						</div>
					</div>
				</div>
			</div>
    </transition>
  </teleport>
</template>

<script>
import { ElNotification } from 'element-plus';
import { useStore } from 'vuex';
import {reactive,ref, unref} from "vue"
import user from "../../../../api/home/user"
export default {
	setup(){
    const formCustomRef = ref(null);
    const formCustom = reactive({
      name:"",
      password:""
      
    });
    const rules= reactive({
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2到 20 个字符",
            trigger: "change",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "长度在 6到 20 个字符",
            trigger: "change",
          },
        ],
    });
    const store = useStore()

		const ThirdPartyLogin = (ltype)=>{
			const url = "http://localhost:8081/users/login/"+ltype+"/redirect";
      window.location.href = url;
			console.log(ltype);
		}

    /** 关闭弹窗 */
    const close = ()=>{
      store.commit("closeLogDia")
    }
    const showSign = ()=>{
      store.commit("closeLogDia")
      store.commit("showSignDia")
    }

    const login = async ()=>{
      let form = unref(formCustomRef)
      if(!form)return
      try{
        await form.validate();
        user.Login(form.model).then((result) => {
          console.log(result);
          store.commit("setUserInfo",result.data.user);
          store.commit("setToken",result.data.token)
        }).catch((err) => {
          console.log("ADW");
          console.log(err);
          ElNotification.warning({
            title:"信息错误",
            message:"账户名或密码不符规范"
          })
        }); 
      }catch(error){
        ElNotification.warning({
          title:"信息错误",
          message:"账户名或密码不符规范"
        })
      }
    }

		return {
			ThirdPartyLogin,
      close,
      formCustom,
      showSign,
      rules,
      login,
      formCustomRef,
		}
	}
}
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
    .login {
      position: relative;
      width: 430px;
      background: linear-gradient(180deg, #dcf4ff, #f4fcff);
      box-shadow: 0 0px 25px 5px rgba(46, 58, 89, 0.1);

      &:hover{
        box-shadow: 0 30px 50px 20px rgba(46, 58, 89, 0.1);
      }
      .close {
        position: absolute;
        right: 20px;
        top: 20px;
        height: 30px;
        width: 30px;
        color: #ccc;
        cursor: pointer;
        font-size: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
        &:hover{
          color:#aaa;
        }
      }
      .title {
        margin: 10px 0 0;
        color: #2e3a59;
        line-height: 46px;
        text-align: center;
        font-size: 20px;
        font-weight: 700;
        font-family: GlowSansSC-ExtendedHeavy;
      }
      .alert {
        position: relative;
        padding: 8px 15px 8px 37px;
        margin: 10px 0;
        box-sizing: border-box;
        background-color: #fffbe6;
        border-radius: 10px;
        color:rgb(109, 109, 109);
        font-size: 14px;
        font-weight: 500;
        line-height: 1.5715;
        list-style: none;
        .iconfont {
          position: absolute;
          top: 8px;
          left: 16px;
          color: #faad14;
        }       
      }
      .mode {
        display: flex;
        align-content: center;
        justify-content: center;
        .item {
          height: 48px;
          width: 48px;
          margin: 20px;
          cursor: pointer;
          border: 2px solid #efefef;
          border-radius: 50%;
          line-height: 48px;
          font-size: 24px;
          transition: all 0.3s;
          text-align: center;
          i {
            font-size: 24px;
          }
        }
        .qq {
          color: #7bd4ef;

          &:hover {
            background: rgba(123, 212, 239, 0.4);
            border-color: #7bd4ef;
          }
        }
        .gitee {
          color: #fe7300;

          &:hover {
            background: rgba(254, 115, 0, 0.4);
            border-color: #fe7300;
          }
        }
        .github {
          color: #383838;

          &:hover {
            background: rgba(56, 56, 56, 0.4);
            border-color: #383838;
          }
        }
      }
    }
	}
}

// A 标签的相关配置
a {
    color: var(--main-6);
    font-weight: 500;
    /* padding: 0 2px; */
    text-decoration: none;
    transition: all .6s;
    position: relative;
    transition: all .6s ease-in-out;
    cursor: pointer;
}

.a-tag a:hover {
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
.login-btn{
    text-align:center;
    .user {
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

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

@media (max-width: 500px) {
  .login-modal {
    .login-wrap {
      .login {
        width: 90%;
        margin: 0 5%;

        .title {
          font-size: 20px;
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>
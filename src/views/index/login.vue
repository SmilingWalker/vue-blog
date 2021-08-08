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
import { useStore } from 'vuex';

export default {
	setup(){
    const store = useStore()

		const ThirdPartyLogin = (ltype)=>{
			/**处理登录信息 */
			console.log(ltype);
		}

    /** 关闭弹窗 */
    const close = ()=>{
      console.log("AAA");
      store.commit("closeLogDia")
    }
		return {
			ThirdPartyLogin,
      close
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
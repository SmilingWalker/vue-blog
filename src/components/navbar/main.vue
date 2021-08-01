<template>
  <header class="navbar" :class="{
    'navbar-folder':folding,
    'navbar-open':visible && folding,
    'navbar-fixed':fixed
  }"
  :style="arriveHeight?style.arrive:style.normal">
  <nav class="nav-main">
    <div class="nav-header">
      <router-link :to="url">
        <slot name="logo">
          <!-- 传入logo 背景 -->
          <span v-if="logo" class="nav-brand">
          </span>
        </slot>
      </router-link>
      <router-link :to="url">
        <slot name="title">
            <span class="nav-title">{{ title }}</span>
        </slot>
      </router-link>
    </div>
    <transition>
      <ul class="nav-section"  
      v-show="folding" 
      :style="{ 'justify-content': sectionPosition }"
      >
        <li 
        v-for="item in section" 
        :key="item.key">
          <router-link 
            v-if="!item.children"
            :to="item.link"
            style="display: block; width: 100%; height: 100%"
            >
              <span class="nav-section-item"
              :class="{active: $route.path == item.link}">{{item.title}}</span>
          </router-link>
          <el-dropdown class="dropdownDiv" v-else >
            <span class="nav-section-item"  @mouseout="dropdown_hover =!dropdown_hover" @mouseover="dropdown_hover = !dropdown_hover">
              {{item.title}}
              <span class="el-icon-caret-bottom arrow-down" style="margin-left:5px"  :style="{ transform: `rotate(${dropdown_hover ? 180 : 0}deg)`,transition:'0.5s all'}"></span>
            </span>
            <template #dropdown v-if="item.children" >
              <el-dropdown-menu>
                <el-dropdown-item v-for="child in item.children"  :key="child.key" class="nav-section-child">
                  <span role="link" :class="child.key" class="nav-section-child-item" >
                    <router-link :to="child.link" custom >
                      <span>{{child.title}}</span>
                    </router-link>
                  </span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </li>
      </ul>
    </transition>
    <div class="nav-footer">
      <el-dropdown class="user">
        <el-avatar :size="50" src="https://bit-images.bj.bcebos.com/bit-new/file/20210323/4inn.png" fit="fill">
          User
        </el-avatar>
      </el-dropdown>
    </div>
  </nav>
  </header>
</template>

<script>
import { ref } from "vue"
export default {
    name:"NavBar",
    props:{
      url:{
        type:String,
        default:"/"
      },
      logo:{
        type:String,
        default:"none"
      },
      section:{
        type:Array,
      },
      title: {
      type: String,
      default: "晴空",
      },
      sectionPosition:{
        type:String,
        default:"center"
      },
      style:{
        type:Object,
        default:()=>{
          return{
            normal:{
              "background-color":"#fff"
            },
            arrive:{
              "background-color":"#fff",
              "box-shadow":"0 4px 30px rgba(0,0,0,.84)"
            }
          }
        }
      }
    },
    setup(props){
      // 是否可见
      let visible = ref(false)
      //是否折叠
      let folding = ref(true)
      let arriveHeight = ref(false)
      let dropdown_hover = ref(false);
      let a = props;
      console.log(a);


      const dropdown_fun= ()=>{
        dropdown_hover.value = !dropdown_hover.value
      };
      return{
        visible,
        folding,
        arriveHeight,
        dropdown_hover,
        dropdown_fun
      }
    },
    methods:{

    },
    computed:{

    }
}
</script>

<style scoped>
.navbar{
  width:100%;
  height:72px;
  position: fixed;
  top: 0;
  z-index:233;
  transition:all 0.3s;
  box-sizing:border-box;
  color:rgba(0,0,0,0.35);
}
.nav-main{
    display: flex;
    height: 100%;
    padding: 0 40px;
    margin: 0 auto;
    position: relative;
    min-height: 50px;
    box-sizing: border-box;
}
.nav-header{
  display: flex;
  align-items: center;
}

.navbar  a {
    text-decoration: none;
}
.navbar  ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.nav-brand {
  display: block;
  height: 40px;
  width: 50px;
  background-image: URL("../../assets/image/qin.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  text-indent: -9999px;
}
.nav-title{
  font-size: 16px;
  line-height: 16px;
  align-content: center;
  border-left: 1px solid #ccc;
  padding-left: 15px;
  margin-left: 15px;
  font-style: normal;
  font-weight: 400;
  color: #71daff;
}



.nav-section{
  display: flex;
  flex: 1 1;
  justify-content: center;
  align-items: center;
  margin: 0;
}
.nav-section{
  list-style:none;
}
.nav-section li{
  height: 100%;
  padding: 0 15px;
}
.nav-section a{
  color: inherit;
}

.nav-section .nav-section-item{
  /*鼠标样式改变*/
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 100%;
  position: relative;
  padding-left:4px ;
  padding-right:4px ;
  color: #aaa;
  font-size: 16px;
  font-weight: 400;
}
.nav-section :hover{
  color: #1b9aee;
}
.nav-section .active{
  border-bottom:2px solid #1b9aee;
  color: #1b9aee;
}

/**drop down */
.nav-section >>> .dropdownDiv{
  height: 100%;
}

.drop-down-float {
  position: relative;
}
.drop-down-float   .drop-down-menu {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
.el-dropdown-menu{
  padding: 0px;
  padding-top:8px ;
}

.el-dropdown-menu__item{
  padding: 0 8px;
}
.nav-section-child{
  transition: all 0.3s;
}
.nav-section-child:hover{
  
  transform: translateY(-3px);
}
.nav-section-child-item{
  height: 70px;
  width: 140px;
  display: flex;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 8px;

  line-height: 19px;
  font-size: 16px;
  font-weight: 600px;

  box-sizing: border-box;
}
.project{
  background-size:cover;
  background-image: url("../../assets/image/bgp_project.jpg") ;
}
.dairy{
  background-size:cover;
  background-image: url("../../assets/image/bgp_dairy.jpg") ;
}

.nav-section-child-item >>> li{
  pad: 0;
}
.arrow-down{
  transition: 0.3 all;
}


.nav-footer{
  display: flex;
  height: 100%;
}

.nav-footer >>> .el-dropdown{
  text-align: center;
  margin: auto 0;
}

.nav-footer >>> .user{
  margin-right: 20px;
}

/** 用来取消router-link的样式 */
a {
  text-decoration: none;
  color: inherit;
}
</style>
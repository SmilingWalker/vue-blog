<template>
  <div class="index">
    <el-carousel indicator-position="none" 
    :interval="7000"  height="100vh" @change="changeImage" :style="{ 'background-image':'url('+bcgNow+')'}" 
    :pause-on-hover="false" >
      <el-carousel-item v-for="(img,index) in bcgList" :key="img" :class="index"  >
        <div :style="{ 'background-image':'url('+bcgList[index-1]+')'}">
          <el-image :src="img" fit="fill">{{index}}</el-image>
        </div>
      </el-carousel-item>
            <div class="waves-area">
        <svg
          class="waves-svg"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"

          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shape-rendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="
              M -160 44 
              c 30 0 58 -18 88 -18 
              s 58 18 88 18 
              s 58 -18 88 -18 
              s 58 18 88 18 
              v 44 
              h -352 
              Z"
            ></path>
          </defs>
          <g class="parallax">
            <use xlink:href="#gentle-wave" x="48" y="0"></use>
            <use xlink:href="#gentle-wave" x="48" y="3"></use>
            <use xlink:href="#gentle-wave" x="48" y="5"></use>
            <use xlink:href="#gentle-wave" x="48" y="7"></use>
          </g>
        </svg>
      </div>
    </el-carousel>

      <Introduction v-for="item of info" 
      :key="item.key" :info="item.info" :title="item.title" 
      :url="item.url" :content="item.content" :class="item.key"
      :reverse="item.reverse">
      <template #info="{info}" v-if="item.key=='study'">
        <div class="study-item">
          <div>
            <span class="image">
              <img :src="info.url">
            </span>
            <p class="title">
              {{info.title}}
            </p>
          </div>
        </div>
      </template>

      </Introduction>
  </div>
  
</template>
<script>

import {ref} from "vue"
// @ is an alias to /src
import bcg1 from "@/assets/image/bcg1.jpg"
import bcg2 from "@/assets/image/bcg2.jpg"
import bcg3 from "@/assets/image/bcg3.jpg"
import bcg4 from "@/assets/image/bcg4.jpg"

import Introduction from '../components/home/introduction.vue'

export default {
  name: 'Home',
  components: {
    Introduction
    
  },
  setup(){
    const bcgList = [bcg1,bcg2,bcg3,bcg4];
    let bcgNow = ref("")
    const info=[
            {
                url:'https://iconfont.alicdn.com/t/7dc3c4f4-0805-477d-9f7e-20f3ec164107.png',
                title:'关于博客',
                content:'<p>这是一次重零开始的尝试、是自主学习的开始、是发现兴趣源头。</p><p>重零开始至博客2.0的重构，学无止境，继续出发！采用最新VUE 3.0架构，脱离UI库，自主编写UI组件！大三上完成博客前端重构</p><p>博客布局及样式参考——Teambition</p><p>组件样式来自于——Element、Ant</p><p>音乐播放器部分样式参考——APlayer</p>',
                key:'about',
                info:[
                    {
                        title:'Vue',
                        url:'https://iconfont.alicdn.com/t/7dc3c4f4-0805-477d-9f7e-20f3ec164107.png'
                    },
                     {
                        title:'Laravel',
                        url:'https://iconfont.alicdn.com/t/7dc3c4f4-0805-477d-9f7e-20f3ec164107.png'
                    },
                    {
                        title:'ByUI',
                        url:'https://iconfont.alicdn.com/t/7dc3c4f4-0805-477d-9f7e-20f3ec164107.png'
                    }
                ]
            },
            {
                url:'https://iconfont.alicdn.com/t/56f85d77-57a9-435b-b3ae-ec344ff25691.png',
                title:'学习目标',
                content:'<p>只有不断的学习才能进步，而循序渐进才是我的学习思想。</p><p>有了明确的学习目标才能我有动力前进，在本项目重构之前，也荒废了一段时间，沉浸在自己的完成博客的喜悦中，殊不知这才是一个开始！</p>',
                key:'study',
                reverse:true,
                info:[
                    {
                        title:'熟悉Vue生态',
                        url:'https://iconfont.alicdn.com/t/7dc3c4f4-0805-477d-9f7e-20f3ec164107.png'
                    },
                     {
                        title:'编写Vue UI库',
                        url:'https://iconfont.alicdn.com/t/7dc3c4f4-0805-477d-9f7e-20f3ec164107.png'
                    },
                    {
                        title:'了解Vue原理',
                        url:'https://iconfont.alicdn.com/t/7dc3c4f4-0805-477d-9f7e-20f3ec164107.png'
                    },
                    {
                        title:'待续...',
                        url:'https://iconfont.alicdn.com/t/7dc3c4f4-0805-477d-9f7e-20f3ec164107.png'
                    }
                ]
            },
            {
                url:'https://iconfont.alicdn.com/t/f524cdcc-89ee-4236-8e81-7e010a250d53.png',
                title:'关于我',
                content:'<p>本着无聊的态度学了了Vue,也由此迷上了前端！</p><p>Baymax,00后程序小白！思维呆板！做事执着！学习能力一般，除非感兴趣！</p><p>掌握技能：Vue、Laravel、Java、Php、Mysql、Js、Ps  ……</p><p>可以在以下场所找到我！</p>',
                key:'about-me',
                info:[
                    {
                        title:'Gitee',
                        url:'https://iconfont.alicdn.com/t/7dc3c4f4-0805-477d-9f7e-20f3ec164107.png',
                        link:'https://gitee.com/baymaxsjj'
                    },
                     {
                        title:'GitHub',
                        url:'https://iconfont.alicdn.com/t/7dc3c4f4-0805-477d-9f7e-20f3ec164107.png',
                        link:'https://github.com/baymaxsjj'
                    },
                    {
                        title:'Csdn',
                        url:'https://iconfont.alicdn.com/t/7dc3c4f4-0805-477d-9f7e-20f3ec164107.png',
                        link:'https://blog.csdn.net/weixin_45294607'
                    },
                    {
                        title:'待续...',
                        url:'https://iconfont.alicdn.com/t/7dc3c4f4-0805-477d-9f7e-20f3ec164107.png',
                        link:'/'
                    }
                ]
            },
    ]


    const changeImage=(pre,)=>{
      //为了实现 跑马灯的效果，更改当前背景为上一张图片 为了防止图片的频闪，需要设置延时，当 当前图片完全显示后再设置背景
      setTimeout(()=>{
        bcgNow.value = bcgList[pre];
      },1500)
      
    };
    return{
      bcgNow,
      bcgList,
      info,
      changeImage,
    }
  }
}
</script>

<style lang="scss" scoped>
.index{
  position: relative;
  width: 100%;
  z-index: 0;
  background: #aaa;
  .el-carousel{
    height: 100%;
    background-size: cover;
    .el-carousel__item{
      opacity: 0;
      transition: opacity 1.5s ;
    }
    .is-active{
      opacity: 1;
      transition: opacity 1.5s ;
    }

  }
  .el-image{
    width: 100%;
    height: 100%;
  }
  .about, .about-me{
    background-color: #fff;
  }
  .study{
    background: #f6f8f9;
    .study-item{
      color: #336a99;
      display: flex;
      align-items: center;
      margin-right: 10px;
      img{
        width: 50px;
        height: 50px;
      }
      .title{
        font-size:14px ;
      }
    }
  }
}
</style>

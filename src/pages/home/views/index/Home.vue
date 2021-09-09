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

    </el-carousel>
      <div class="SenContainer">
        <span class="senContent">
          站在山巅与日月星辰对话，潜游海底和江河湖海晤谈，和每一棵树握手，和每一株草私语，方知宇宙浩瀚，自然可畏，生命可敬。
        </span>
        <span class="senAuthor">
          -- 《你好生活》
        </span>
      </div>
      <Map></Map>
      <!-- <Footer></Footer> -->
  </div>
  
</template>
<script>

import { ref} from "vue"
// @ is an alias to /src
import bcg1 from "@/assets/image/bcg1.jpg"
import bcg2 from "@/assets/image/bcg2.jpg"
import bcg3 from "@/assets/image/bcg3.jpg"
import bcg4 from "@/assets/image/bcg4.jpg"
import Map from "../index/Map.vue"
import {onMounted} from "vue"


export default {
  name: 'Home',
  components: {
    // Footer 
    Map 
  },

  setup(){

    const bcgList = [bcg1,bcg2,bcg3,bcg4];
    let bcgNow = ref("")



    const changeImage=(pre,)=>{
      //为了实现 跑马灯的效果，更改当前背景为上一张图片 为了防止图片的频闪，需要设置延时，当 当前图片完全显示后再设置背景
      setTimeout(()=>{
        bcgNow.value = bcgList[pre];
      },1500)
      
    };


    onMounted(()=>{
    })
    return{
      bcgNow,
      bcgList,
      changeImage,
    }
  }
}
</script>

<style lang="scss" scoped>
@font-face {
  font-family: Ma Shan Zheng;
  src: url("../../../../assets/font/MaShanZheng-Regular.ttf");
}
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
  .SenContainer{
    position: absolute;
    width: 30%;
    right: 33%;
    top: 40%;
    z-index: 9999; 
    span{
      line-height: 40px;
      font-family: 'Ma Shan Zheng', cursive;
      font-size: 30px;

      transition: .2s;
      cursor: pointer;
      &:hover {
        text-shadow: 
        0 0 10px #0ebeff, 
        0 0 20px #0ebeff, 
        0 0 50px #0ebeff, 
        0 0 100px #0ebeff, 
        0 0 200px #0ebeff;
    }
    }
    .senAuthor{
      position: absolute;
      right: -60px;
      bottom:-60px
    }
  }


}
</style>

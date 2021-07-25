<template>
  <header class="navbar" :class="{
    'navbar-folder':folding,
    'navbar-open':visible && folding,
    'navbar-fixed':fixed
  }"
  :style="arriveHeight?style.arrive:style.normal">
  <nav>
    <div class="nav-header">
      <router-link :to="url">
        <slot></slot>
      </router-link>
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
      let folding = ref(false)
      let arriveHeight = ref(false)
      let a = props;
      console.log(a)
      return{
        visible,
        folding,
        arriveHeight

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
  height:12px;

  z-index:233;
  transition:all 0.3s;
  box-sizing:border-box;
  background-color:#fff;
  color:rgba(0,0,0,0.35)
}
</style>
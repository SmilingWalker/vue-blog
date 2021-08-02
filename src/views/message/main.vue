<template>
  <div class="message container" v-infinite-scroll="loadMore" :infinite-scroll-disabled="busy" >
      <div class="message-add">
        <h2 class="title">Speak freely!</h2>
        <Conmment class="comment" :length="300"></Conmment>
      </div>
      <div class="message-list">

      </div>
  </div>
</template>

<script>
import {ref,reactive} from "vue"
import Conmment from './comment.vue';

export default {
    name:"message",
    props:{

    },
    components:{
        Conmment
    },
    setup(){

        /**决定当前是否执行loadMore函数 false 表示执行 ，true 表示不执行 */
        let count = ref(0);
        let busy = ref(false);
        let data = reactive([])
        const loadMore = ()=>{
            busy.value = true
            console.log("loadMore");
            for (var i = 0, j = 10; i < j; i++) {
                data.push({name: count.value++ })
            }
            console.log(data)
        

        }

        return{
            loadMore,
            busy,
            data,
            count
        }
    }
}
</script>

<style lang="scss" scoped>
.message{
    margin: 0 auto;
    &-add{
        display: flex;
        padding: 100px 50px;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        .title{
            font-size: 48px;
            font-weight: 750;
            line-height: 110%;
            margin: 90px 0 28px;
            text-shadow: 0px 10px 15px rgba(46, 58, 89, 0.5);
        }
        .comment{
            box-shadow: 0 30px 50px 20px rgba(46, 58, 89, 0.1);
            border-radius: 20px;
            background-color: #fff;
        }
    }
}

@media (max-width: 776px) {
  .message {
    &-add {
        padding: 100px 10px;
      .title {
        font-size: 28px;
      }
      .comment{
        margin:0px 10px;
        box-sizing: border-box;
      }
    }

    &-list {
      flex-direction: column;

      .message-list-card {
        width: 90%;
      }
    }
  }
}
</style>
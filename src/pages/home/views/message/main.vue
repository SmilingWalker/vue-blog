<template>
  <div class="message container" v-infinite-scroll="loadMore" :infinite-scroll-disabled="busy" >
      <div class="message-add">
        <h2 class="title">Speak freely!</h2>
        <Conmment class="comment" :length="300"></Conmment>
      </div>
      <div class="message-list">
        <div class="left">
          <div v-if="loading">
            <el-skeleton v-for="item of 3 " :key="'Skeleton'+item" class="concise" :class="'message-list-item-bg-'+(item+1)%4" animated>
              <template #template>
                <div style="display:flex;padding:10px 0">
                  <el-skeleton-item variant="circle" style="width: 50px;height:50px;" ></el-skeleton-item>
                  <div style="display:flex;flex-direction:column">
                    <el-skeleton-item variant="text" style="width:220px;margin:15px 30px 25px;height:23px"></el-skeleton-item>
                    <el-skeleton-item variant="p" style="width:520px;margin:10px 30px 5px;height:18px;line-height:18px;" ></el-skeleton-item>
                    <el-skeleton-item variant="p" style="width:520px;margin:10px 30px 5px;height:18px;line-height:18px" ></el-skeleton-item>      
                    <el-skeleton-item variant="p" style="width:320px;margin:10px 30px 5px;height:18px;line-height:18px" ></el-skeleton-item> 
                  </div>                  
                </div>
              </template>
            </el-skeleton>
          </div>
          <template v-else>
            <MessageCard v-for="(item,index) in listItems.left" :key="item.id" :item="item" class="message-list-card" :class="'message-list-item-bg-'+(index+1)%4"></MessageCard>
          </template>
        </div>
        <div class="right">
          <div v-if="loading">
            <el-skeleton v-for="item of 3 " :key="'Skeleton'+item" class="concise" :class="'message-list-item-bg-'+(item+1)%4" animated>
              <template #template>
                <div style="display:flex;padding:10px 0">
                  <el-skeleton-item variant="circle" style="width: 50px;height:50px;" ></el-skeleton-item>
                  <div style="display:flex;flex-direction:column">
                    <el-skeleton-item variant="text" style="width:220px;margin:15px 30px 25px;height:23px"></el-skeleton-item>
                    <el-skeleton-item variant="p" style="width:520px;margin:10px 30px 5px;height:18px;line-height:18px;" ></el-skeleton-item>
                    <el-skeleton-item variant="p" style="width:520px;margin:10px 30px 5px;height:18px;line-height:18px" ></el-skeleton-item>      
                    <el-skeleton-item variant="p" style="width:320px;margin:10px 30px 5px;height:18px;line-height:18px" ></el-skeleton-item> 
                  </div>                  
                </div>
              </template>
            </el-skeleton>
          </div>
          <template v-else>
            <MessageCard v-for="(item,index) in listItems.right" :key="item.id" :item="item" class="message-list-card" :class="'message-list-item-bg-'+(index+1)%4"></MessageCard>
          </template>
        </div>
      </div>
      <p class="last" v-if="current_page==last_page">—— 我可是有底线的！——</p>
  </div>
</template>

<script>
import {ref,reactive, computed} from "vue"
import Conmment from './comment.vue';
import MessageCard from './message-card.vue';
import textData from './test.json'

export default {
    name:"message",
    props:{

    },
    components:{
        Conmment,
        MessageCard
    },
    setup(){

        /**决定当前是否执行loadMore函数 false 表示执行 ，true 表示不执行 */
        let count = ref(0);
        let busy = ref(false);
        const loading = ref(false)
        let data = reactive([])
        let rawData = reactive(textData);
        const listItems = computed(()=>{
          const left = [];
          const right = [];
          const list = rawData.data.data
          for (let i=0,leng = list.length;i<leng ;i++) {
              if ((i + 1) % 2) {
                  left.push(list[i]);
                } else {
                  right.push(list[i]);
                }
          }
          return{
            left,right
          }
        })

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
            count,
            loading,
            listItems
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

    &-list{
      display: flex;
      .left, .right{
        flex: 1;
        overflow: hidden;
        padding: 10px;
        .message-list-card{
          width: 100%;
          box-sizing: border-box;
          transition: all 0.4s;
          margin:0 0 20px;
        }
        .message-list-item-bg-0 {
          background: linear-gradient(180deg, #d2e5f9, #f8fbfe);
        }

        .message-list-item-bg-1 {
          background: linear-gradient(180deg, #dcf4ff, #f4fcff);
        }

        .message-list-item-bg-2 {
          background: linear-gradient(180deg, #fff0ce, #fffcf6);
        }

        .message-list-item-bg-3 {
          background: linear-gradient(180deg, #ffe4cf, #fff7f1);
        }
      }
    }
    .last{
      text-align: center;
      color: #bababa;
      font-size: 14px;
      margin: 10px 0;
    }
}
/** 对移动端进行适配 */
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
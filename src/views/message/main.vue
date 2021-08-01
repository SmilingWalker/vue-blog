<template>
  <div class="message container" v-infinite-scroll="loadMore" :infinite-scroll-disabled="busy" >
      <div class="message-add">
        <h4 class="title">Speak freely!</h4>
        <Conmment class="comment" ></Conmment>
      </div>
      <div class="message-list">

      </div>
  </div>
    <ul class="infinite-list" v-infinite-scroll="loadMore" :infinite-scroll-disabled="busy" style="overflow:auto">
        <li v-for="i in count" :key="i" class="infinite-list-item">{{ i }}</li>
    </ul>
</template>

<script>
import {ref,reactive} from "vue"
import Conmment from './conmment.vue';

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

<style>

</style>
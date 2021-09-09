<template>
    <MessCard class="message-list-card concise">
      <template #actions>
          <div class="actions">
              <span class="time">{{formatDate(item.created_at)}}</span>
              <span>{{formatAddress(item.address)}}</span>
              <span class="reply iconfont icon-xiaoxi1" @click="show('message',item.id)"></span>
              <span class="delete iconfont icon-shanchu" 
                v-if="(user.id == item.user_id && item.id>0)|| user.is_admin == 1"
                 @click="deleteMessage('message',item.id)"></span>

               <!-- TODO(frank):需要后端数据处理，暂时不清楚具体结构 -->
          </div>
            <Comment  v-if="commentID == 'message' + item.id && commentShow" @submit="reply($event,item.id)" :length="300">
            </Comment> 
      </template>
      
      <template #author>
          <a>{{ item.user ? item.user.name : item.tourist }}</a>
        <span v-if="item.user?item.user.is_admin:false" class="class">博主</span>

      </template>
      <!-- 用户头像部分 -->
      <template #avatar>
          <el-image :src="item.user ? item.user.avatar_url:
            item.qq ? 'http://q1.qlogo.cn/g?b=qq&nk=' + item.qq + '&s=100': ''" class="user">
              <template #placeholder>
                  <img style="width: 100%;height: 100%;" src="https://bit-images.bj.bcebos.com/bit-new/file/20210323/4inn.png"/>
              </template>
              <template #error>
                  <img style="width: 100%;height: 100%;" src="https://bit-images.bj.bcebos.com/bit-new/file/20210323/b72d.png"/>
              </template>
          </el-image>
      </template>
      <!-- 留言内容 -->
      <template #content>
        <Preview :content="format(item.message)"></Preview>
        <!-- 信息回复 -->
        <template v-if="item.reply&&item.reply.length">
            <MessCard v-for="item of item.reply" :key="'reply' + item.id" :item="item" class="message-list-card" style="padding:0px;margin:0px">
                <template #actions>
                    <div class="actions">
                        <span class="time">{{formatDate(item.created_at)}}</span>
                        <span>{{formatAddress(item.address)}}</span>
                        <span class="reply iconfont icon-xiaoxi1" @click="show('message',item.id)"></span>
                        <span class="delete iconfont icon-shanchu" 
                        v-if="(user.id == item.user_id && item.id>0)|| user.is_admin == 1"
                        @click="deleteMessage('message',item.id)"></span>
                    <!-- TODO(frank):需要后端数据处理，暂时不清楚具体结构 -->
                        <Comment  v-if="commentID == 'message' + item.id && commentShow" @submit="reply($event,item.id)" :length="300">

                        </Comment> 
                    </div>
                </template>
                <template #author>
                <a>{{"用户名"}}</a>
                <span v-if="item.user?item.user.is_admin:false" class="class">博主</span>
                </template>
                <!-- 用户头像部分 -->
                <template #avatar>
                        <el-image :src="item.user ? item.user.avatar_url:
                            item.qq ? 'http://q1.qlogo.cn/g?b=qq&nk=' + item.qq + '&s=100': ''" class="user">
                            <template #placeholder>
                                <img style="width: 100%;height: 100%;" src="https://bit-images.bj.bcebos.com/bit-new/file/20210323/4inn.png"/>
                            </template>
                            <template #error>
                                <img style="width: 100%;height: 100%;" src="https://bit-images.bj.bcebos.com/bit-new/file/20210323/b72d.png"/>
                            </template>
                        </el-image>
                </template>
                <!-- 留言内容 -->
                <template #content>
                        <Preview :content="format(item.reply)"></Preview>
                </template>
            </MessCard>
        </template>
      </template>


  </MessCard>
</template>

<script >
import MessCard from "@/components/comment/MessCard"
import Preview from '@/components/editor/preview'
import Comment from '@/pages/home/views/message/comment'
import emoji from "./emoji.json";
import {reactive, ref} from "vue"
export default {
    components:{
        MessCard,
        Preview,
        Comment
    },
   
    props:{
        item:{
            type:Object,
            default:null
        }
    },
    setup(props,context){
        const commentID = ref("");
        const commentShow = ref(false);

        /** 测试用代码， 需要删除 */
        const state = ref(false);
        const changeState = ()=>{
            state.value = ! state.value
            console.log(state);
        }
        // TODO(frank): 需要从当前登录信息里获取用户信息。
        const user = reactive({
            avatar_url: "https://bit-images.bj.bcebos.com/bit-new/file/20210323/buc3.jpg",
            id: 1,
            is_admin: 0,
            name: "Baymax",
        })

        const emotion = (re)=>{
            if(emoji[re]){
                return `![${re.slice(1,-1)}](${emoji[re]})`
            }
            return re
        }
        const format = (content) => {
            console.log(content);
            return content.replace(/#(.){0,8}?;/gi, emotion);
        };
        const reply = (cont, id) => {
            const info = {
                mess_id: props.item.id,
                reply: cont,
            };
            if (id) {
                info["mess_reply_id"] = id;
            }
            context.emit("reply", info);
            console.log(info);
            // replyAdd(info);
        };
        const deleteMess = (type, id) => {
            context.emit("delete", {
                type,
                id,
            });
        };
        const formatDate = (dateTimeStamp) => {
            dateTimeStamp = Date.parse(dateTimeStamp.replace(/-/gi, "/"));
            const minute = 1000 * 60;
            const hour = minute * 60;
            const day = hour * 24;
            //   const halfamonth = day * 15;
            const month = day * 30;
            const now = new Date().getTime();
            const diffValue = now - dateTimeStamp;
            if (diffValue < 0) {
                return;
            }
            const monthC = diffValue / month;
            const weekC = diffValue / (7 * day);
            const dayC = diffValue / day;
            const hourC = diffValue / hour;
            const minC = diffValue / minute;
            let result = "";
            if (monthC >= 1) {
                result = "" + parseInt(monthC) + "月前";
            } else if (weekC >= 1) {
                result = "" + parseInt(weekC) + "周前";
            } else if (dayC >= 1) {
                result = "" + parseInt(dayC) + "天前";
            } else if (hourC >= 1) {
                result = "" + parseInt(hourC) + "小时前";
            } else if (minC >= 1) {
                result = "" + parseInt(minC) + "分钟前";
            } else {
                result = "刚刚";
            }
            return result;
        };
        const formatAddress = (address) => {
            if (!address) return;
            let adds = address.split("-");
            let province = adds[1].split("省")[0];
            let city = adds[2].split("市")[0];
            return `${province} • ${city}`;
        };
        //切换类型,切换ID
        const show = (type,id) => {
            if(commentID.value != type+ id ){
                commentShow.value = true
            }else{
                commentShow.value = !commentShow.value
            }
            commentID.value = type + id ;
        }
        return{
            formatAddress,
            formatDate,
            format,
            reply,
            deleteMess,
            commentID,
            commentShow,
            user,
            show,
            changeState,
            state
        }
    }
}
</script>

<style lang="scss" scoped>
.message-list-card{
    animation: fadeTop 0.4s ease-in 0s 1 normal backwards;


    .user {
        height: 48px;
        width: 48px;

        border: 2px solid rgab(233,233,233,.3);
        border-radius: 50%;
        box-sizing: border-box;
        background: #fff;
        color: #c4c4c4;

        line-height: 48px;
    }

    .actions {
        .time {
        margin-right: 3px;
        }

        .reply, .delete {
        float: right;
        font-size: 18px;
        margin: 0 5px;
        cursor: pointer;
        outline: none;
        }       
    }
}

@keyframes fadeTop {
  0% {
    transform: translateY(-10px);
    opacity: 0;
  }

  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
<template>
  <div class="comment">
      <div class="header">
          <el-image  :src="avatar" class="user">
              <template #placeHolder>
                  <img style="width: 100%;height: 100%;" src="https://iconfont.alicdn.com/s/e2e10a5a-ad58-4591-9987-73c68c23a136_origin.svg"/>
              </template>
              <template #error>
                  <img style="width: 100%;height: 100%;" src="https://iconfont.alicdn.com/t/8daee7d9-2099-4294-ae70-3b58deaaaca5.png"/>
              </template>
          </el-image>
          <textarea ref="editor" placeholder="Just write down" class="editor" v-model="content"></textarea>
      </div>
      <div class="body">
          <div class="preview">
              
              <span title="表情" class="emoji-btn iconfont icon-biaoqing" @click="clickShow(true)"></span>
              <span title="预览" class="emoji-btn iconfont icon-preview" @click="clickShow(false)"></span>
          </div>
          <div>
              <span class="str-length">还可以输入<strong>{{length-content.length}}</strong>字</span>
              <el-button @click="submit" title="Cmd|Ctrl+Enter" class="submit">提交</el-button>
          </div>
      </div>
      <div class="footer">
          <div class="preview-wrap" v-show="preview">
              <Preview :content="format"></Preview>
          </div>
          <div class="emoji-wrap" v-show="emojiShow">
              <i v-for="(item,key) of emoji"  :key="key" :title="key.slice(1,-1)" @click="emojiAdd(key)">
                  <img :src="item" >
              </i>
          </div>
      </div>

  </div>
</template>

<script>

import {computed,ref} from 'vue';
import { useStore } from "vuex"
import Preview from '@/components/editor/preview.vue';
import emoji from "./emoji.json"
export default {
    name:"comment",
    components:{
        Preview,
    },
    props:{
        /**用户头像 */
        url:{
            type:String,
            defalut:'https://iconfont.alicdn.com/s/e2e10a5a-ad58-4591-9987-73c68c23a136_origin.svg'
        },
        /**默认长度 */
        length:{
            type:Number,
            defalut:300
        }
    },
    setup(props){
        const store = useStore();
        let content = ref("");
        let preview = ref(true);
        let emojiShow = ref(false);
        const editor = ref(null);
        const state = ref(false)
        const changeState = ()=>{
            state.value = !state.value
        }
        /** 从全局域对象内获取 头像链接 */
        const avatar=computed(()=>{
            const user=store.state.user.user
                if(user){
                    return user.avatar_url
                }
                return props.url
        })

        let clickShow = (show=false)=>{
            //修改预览状态
            if(show){
                emojiShow.value = !emojiShow.value;
                preview.value = false;
            }else{
                emojiShow.value = false;
                preview.value = !preview.value
            }
        }
        let emojiAdd = (em)=>{
            //找到当前鼠标位置，进行插入
            let cursurPosition=editor.value.selectionStart;
            if(!cursurPosition){
                cursurPosition=content.value.length
            }
            console.log(cursurPosition)
            content.value=content.value.slice(0,cursurPosition)+em+content.value.slice(cursurPosition)
        }

        const emotion = (re)=>{
            if(emoji[re]){
                return `![${re.slice(1,-1)}](${emoji[re]})`
            }
            return re
        }
        /**替换表情图像 */
        let format = computed(()=>{
          const cont=content.value.replace(/#(.){0,8}?;/gi,emotion)
          return cont
        })
        return{
            avatar,
            content,
            preview,
            clickShow,
            emojiShow,
            emoji,
            emojiAdd,
            format,
            editor,

            changeState,
            state
        }
    },

}
</script>

<style lang="scss" scoped>
.comment{
    position: relative;

    margin-bottom: 10px;
    padding: 10px;
    width: 100%;

    border: 1px solid #f0f0f0;
    border-radius: 4px;
    box-sizing: border-box;

    overflow: hidden;

    .header {
        display: flex;
        .el-image {
            height: 48px;
            width: 48px;

            border: 2px solid rgba(233,233,233,.3);
            border-radius: 50%;
            box-sizing: border-box;
            background: #fff;
            color: #c4c4c4;

            line-height: 44px;
        }
        .editor {
            display: block;
            flex: 1;

            min-height: 8.75em;
            max-width: 100%;
            padding: 10px 5px;
            resize: none;

            border: none;
            background: transparent;
            color: #336a99;
            outline: none;

            font-size: 16px;
            line-height: 22px;

            transition: all .25s ease;
        }
    }
    .body {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .preview {
            span {
                display: inline-block;
                overflow: hidden;
                vertical-align: cent;
                cursor: pointer;
                fill: #555;
                
                font-size: 30px;
            }
            .emoji-btn {
                margin-left: 10px;
            }
        }

        .str-length {
            padding: 0 8px;
            color: #b5b5b5;

            font-size: 15px;
            font-weight: 400;
            text-align: right;
            strong {
                padding: 0 2px;
                color: #b5b5b5;
                font-family: Georgia, 'Times New Roman', Times, serif;
                font-size: 20px;
                font-weight: 700;
                text-align: center;
            }
        }
        .el-button {
            padding: 10px 15px;

            outline: none;
            color: #555;
            font-size: 15px;
        }

    }
    .footer {
        padding: 10px 0;
        .emoji-wrap {
            
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            i{
                cursor: pointer;
                &:hover{
                    box-shadow:  0px 0px 10px 3px rgba(46,58,89,0.4);;
                    border-radius: 6px;
                }
            }
            img {
                height: 30px;
                width: 30px;
                margin:5px;
            }
        }
    }
}
</style>
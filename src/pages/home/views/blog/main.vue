<template>
  <div class="blog-wrap">
      <div class="blog container">
          <div class="left">
              <div class="info concise">
                  <el-image class="avatar" src="https://iconfont.alicdn.com/s/e2e10a5a-ad58-4591-9987-73c68c23a136_origin.svg"></el-image>
                  <p class="name">Skymoon</p>
                  <div class="about">
                      <span class="btn quant">文章</span>
                      <el-dropdown>
                        <span class="btn me">更多</span>
                        <template  #dropdown>
                            <el-dropdown-menu>
                                 <a href="" target="_blank" class="btn iconfont icon-weibo "></a>
                                 <a href="" target="_blank" class="btn iconfont icon-github"></a>
                                 <a href="" target="_blank" class="btn iconfont icon-gitee2"></a>
                                 <a href="" target="_blank" class="btn iconfont icon-qq"></a>
                            </el-dropdown-menu>
                        </template>
                      </el-dropdown>
                  </div>
              </div>
              <div class="class concise">
                  <el-input class="search-input" placeholder="请输入......" suffix-icon="el-icon-search">

                  </el-input>
                  <router-link to="/blog" class="class-item" >全部文章</router-link>
                  <router-link v-for="item of classList" 
                    :key="item" :class="{ 'class-item-active': $route.query.class == item.classty }"
                    :to="'/blog?class='+item.classty" class="class-item">{{item.classty}}</router-link>
                  <el-skeleton v-if="classLoading" active></el-skeleton>
              </div>
              <div class="label concise">
                  <router-link v-for="item of labelList" :key="item.id" :to="'/blog?label=' + item" 
                    class="label-item" :class="{'label-item-active':$route.query.label == item}">{{item.name}}</router-link>
              </div>
          </div>
          <div class="right"
            v-infinite-scroll="loadMoreBlog" 
            :infinite-scroll-distance="20"
            :infinite-scroll-disabled="loading"
            infinite-scroll-window="false" 
            >
            <div class="article concise" v-for="item of list" :key="item.id">
              <div class="header">
                  <span class="title">{{item.title}}</span>
                  <span class="date iconfont icon-icon18">{{item.created_at.slice(0,-9)}}</span>
              </div>
              <div class="body">
                  <el-image :src="item.img" class="image concise" v-if="item.img" fit="cover" :lazy="true" >
                      <!-- 这里应该有一个 图像组件默认的有一些 placeholder 和 error 占位 -->
                      <!-- TODO(frank):图像组件提取 -->
                    <template #placeholder>
                    <svg xmlns="http://www.w3.org/2000/svg" style="margin:auto;" width="200" height="200" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" display="block"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"/></rect><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9" transform="rotate(30 50 50)"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"/></rect><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9" transform="rotate(60 50 50)"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"/></rect><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9" transform="rotate(90 50 50)"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"/></rect><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9" transform="rotate(120 50 50)"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"/></rect><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9" transform="rotate(150 50 50)"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"/></rect><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9" transform="rotate(180 50 50)"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"/></rect><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9" transform="rotate(210 50 50)"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"/></rect><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9" transform="rotate(240 50 50)"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"/></rect><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9" transform="rotate(270 50 50)"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"/></rect><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9" transform="rotate(300 50 50)"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"/></rect><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9" transform="rotate(330 50 50)"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"/></rect></svg>
                    </template>
                    <template #error>
                    <img
                        style="width: 60%; margin: 0 20%"
                        src="https://iconfont.alicdn.com/s/e8a7a96a-7f80-4f07-bc88-c162da451fe1_origin.svg"
                    />
                    </template>
                  </el-image>
                  <span class="content" v-html="item.description"></span>
              </div>
              <div class="footer">
                  <!-- <div class="info-article">
                      <router-link :to="'/blog?class='+item.classty">
                        <span class="iconfont icon-tags" style="font-size:20px"></span>{{item.classty}}
                      </router-link>
                      <router-link :to="'/blog?class='+item" v-for="item of item.label" :key="item">
                        <span class="iconfont icon-biaoqian"> </span>{{item}}
                      </router-link>  
                  </div> -->
                  <div class="info-data">
                      <router-link :to="'/blog/'+item.id">
                        <span class="iconfont icon-dianji"></span> {{item.clicks}}
                      </router-link>
                      <router-link :to="'/blog/'+item.id">
                        <span class="iconfont icon-xihuan"></span> {{item.click}}
                      </router-link>
                      <router-link :to="'/blog/'+item.id+'#comment'">
                        <span class="iconfont icon-buoumaotubiao48"></span> {{item.message_count}}
                      </router-link>
                  </div>
              </div>
            </div>
            <el-skeleton v-if="ArticleLoading">

            </el-skeleton>
          </div>
      </div>
  </div>
</template>

<script>
import blog from "../../../../api/home/blog"
import {reactive,ref,onMounted} from "vue"
import {ElMessage } from "element-plus"
export default {
    name:"blog",
    components:{
       
    },
    setup(){
        
        let ArticleLoading = ref(false)
        //加载内容数据
        const loadMoreBlog = ()=>{
					if(current_page.value<last_page.value){
						current_page.value = current_page.value + 1;
						GetArticle();
					}else{
						return
					}
        };

        const current_page = ref(1);
        const last_page = ref(1);
        const labelLoading = ref(true)
        const labelList = reactive([])
        const list = reactive([])

        const GetArticle = ()=>{
            ArticleLoading.value = true;
            blog.QueryArticlesByPage(current_page.value).then(
                (response)=>{
									console.log(response.data.article_list);
									while(list.length>0)list.pop();
									list.push(...response.data.article_list);
									ArticleLoading.value = false;
									last_page.value = response.data.last_page;
									current_page.value = response.data.current_page;
									ElMessage({
											message: "文章列表请求成功",
											type: "success",
									});
                }
            ).catch(
                (error)=>{
                ElMessage.error({
                    title:"请求出错",
                    message:error.message
                    })
                }
            )
        }

        const getAllLabel = ()=>{
					blog.QueryAllLabels().then(
						(response)=>{
								labelList.push(... response.data.labels)
						}
					)
        }

        // 初始化部分，需要从网络加载数据 created

        onMounted(()=>{
            GetArticle();
            getAllLabel();
        });

         return {
             list,
             ArticleLoading,
             current_page,
             last_page,
             labelLoading,
             labelList,

             loadMoreBlog
         }
    }
}
</script>

<style lang="scss" scoped>
.blog-wrap{
    background-color: #f6f8f9;
    .blog {
        display: flex;
        flex-flow: nowrap;

        box-sizing: border-box;
        padding: 72px 10px 0;
        .left {
            width: 300px;
            min-width: 24px;
            flex-shrink: 0;
            margin-right: 20px;
            .info, .class, .class{
                margin-top: 10px ;
            }
            .info {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                transition: all 0.4s;
                .avatar {
                    height: 80px;
                    width: 80px;
                    margin: 0;
                    padding: 0;


                    background: #fff;
                    border:2px solid #dcf4ff;
                    border-radius: 50%;
                    color: #c4c4c4;

                    line-height: 44px;
                    text-align: center;

                    cursor: pointer;
                    transition: all .4s;
                }
                &:hover{
                    .avatar{
                        transform: rotate(360deg) !important;
                    }
                }
                .name {
                    margin-top: 10px;
                    color: #2e3a59;
                    font-size: 16px;
                    font-weight: 700;
                    font-family: GlowSansSC-ExtendedHeavy;
                }
                .about {
                    margin-top: 10px;
                    .btn {
                        padding: 5px 10px;
                        border-radius: 10px;
                        color: rgba(0, 0, 0, 0.45);
                        font-size: 14px;
                        margin: 0 5px;
                    }

                    .quant {
                        /** linear-gradient : 渐变颜色  （渐变轴，起始颜色，终止颜色） 渐变轴表示渐变的方向，180deg 表示从上往下渐变 */ 
                      background: linear-gradient(180deg, #fff0ce, #fffcf6);
                    }

                    .me {
                        background: linear-gradient(180deg, #dcf4ff, #f4fcff);
                        cursor: pointer;
                    }                       
                }
            }
            .class {
                .search-input{
                    ::v-deep .el-input__inner{
                        border: 1px solid #cbcbcb;
                        border-radius: 50px;
                        height: 30px; 
                    }
                }
                .class-item{
                    display: block;
                    padding: 6px 5px;

                    text-align: center;
                    color: rgba(0,0,0,.45);
                    border-radius: 10px;

                    font-size: 14px;
                    transition: all 0.3s;
                    &:hover{
                        background: linear-gradient(180deg, #fff0ce, #fffcf6);
                    }
                }
            }
            .label {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                .label-item {
                    margin: 5px;
                    padding: 5px 10px;
                    border-radius: 10px;
                    background: linear-gradient(180deg, #dcf4ff, #f4fcff);

                    color: rgba(0, 0, 0, 0.5);
                    font-size: 15px;

                    &:hover{
                        box-shadow: 0 0px 10px 5px rgba(46, 58, 89, 0.1);
                    }
                }
            }
        }
        .right {
            flex: 1 1 auto;
            .article {
                box-sizing: border-box;
                margin-top: 10px;
                .header {
                    padding:0 0 15px;
                    position: relative;
                    border-bottom: 1px solid #fafafa;

                    .title {
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        word-break: break-all; 
                        overflow: hidden;
                        color: #336a99;
                        line-height: 1.5em;
                        font-size: 20px;
                        font-weight: 500;
                    }

                    .date {
                        position: absolute;
                        bottom: 0;
                        right: 0;

                        font-size: 15px;
                        color:#bebebe;
                        transform: translateY(50%);
                        &::before {
                            margin-right: 10px;
                        }
                    }
                }
                .body {
                    padding: 15px 0;
                    border-bottom: 1px solid #fafafa;
                    overflow: hidden;
                    .image {
                        width: 300px;
                        overflow: hidden;
                        float: left;
                        margin: 0 10px 10px 0;
                        padding: 0;
                    }
                    .content {
                        font-size: 14px;
                        line-height: 25px;
                        cursor: pointer;
                        color: #bebebe;
                        text-align: justify;
                    }
                }
                .footer {
                    display: flex;
                    justify-content: space-between;
                    align-content: center;
                    flex-wrap: wrap;
                    padding: 15px;
                    .info-article, .info-data {
                        a {
                            margin: 0 5px;
                            cursor: pointer;
                            font-size: 14px;
                            color: #bababa;

                            span {
                                margin-right: 4px;
                            }
                        }
                    }
                }
            }
        }
    }
}
.el-dropdown-menu{
    display: inline-block;
    min-width: 90px;
    .btn {
        display: inline-block;
        padding: 5px 10px;
        border-radius: 10px;
        background: linear-gradient(180deg, #dcf4ff, #f4fcff);
        color: rgba(0,0,0,.45);
        margin: 5px;
        &:hover {
            background: linear-gradient(180deg, #fff0ce, #fffcf6);
        }
    }

} 

</style>
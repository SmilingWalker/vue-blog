<template>
  <div v-loading="loading">
    <el-table v-if="list" :data="list" style="width: 100%">
      <el-table-column label="ID">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="标题">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标签">
        <template #default="scope">
          <el-tag
            type="success"
            closable
            :color="randomColor(item.label_name)"
            :disable-transitions="true"
            @close="deleteLabel(scope.row.id,item.label_id)"
            v-for="item of scope.row.labelList"
            :key="item.label_id"
            style="margin:2px;color:#ddd"
            >{{ item.label_name }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="浏览量">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.click }}</span>
        </template>
      </el-table-column>

      <el-table-column label="喜欢量">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.likes }}</span>
        </template>
      </el-table-column>

      <el-table-column label="创建日期">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>

      <el-table-column label="是否上架">
        <template #default="scope">
          <el-switch
            v-if="scope.row.id"
            v-model="scope.row.is_show"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="setRemove($event,scope.row.id)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)"
            >修改</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="list"
      background
      layout="prev, pager, next"
      :page-size="last_page"
      :page-count="last_page"
      :current-page="current_page"
      @current-change="change"
      style="display: flex; justify-content: center; margin-bottom: 10px"
    >
    </el-pagination>
  </div>
</template>
<script>
// import { useStore } from 'vuex';
import router from '@/pages/admin/router'
import {ref,reactive} from "vue"
import { ElMessage } from 'element-plus';
import randomcolor  from "randomcolor";
// import label from "../../../api/admin/label";
import article from "../../../api/admin/article";
import label from '../../../api/admin/label';

export default {
  name: "ArticleList",
  setup(){
    // const store = useStore();
    const list = reactive([]);
    const loading = ref(false);
    const current_page = ref(1);
    const last_page = ref(1);
    const page = ref(1);


    /**
     * method 部分
     */
    
    const getArticleList = ()=>{
      loading.value = true;
      article.QueryArticlesByPage(current_page.value).then(
        (response)=>{
          while(list.length>0)list.pop();
          list.push(...response.data.article_list);
          loading.value = false;
          last_page.value = response.data.last_page;
          current_page.value = response.data.current_page;
          ElMessage({
            message: "文章列表请求成功",
            type: "success",
          });
        }
      ).catch(
        (error)=>{
          ElMessage.success({
            title:"请求出错",
            message:error.message
          })
        }
      )
    };
    const handleEdit= (id)=>{
      router.push({ path: "/home/articles/update/" + id });
    };
    const setRemove = (state,id)=>{
      console.log(state);
      article.SetArticleOffShow(state,id).then(
        (response)=>{
          console.log(response);
        }
      ).catch(
        (error)=>{
          console.log(error);
          return 
      })
    };

    const change = (page)=>{
      console.log(page);
      current_page.value = page;
      getArticleList();
    };

    const deleteLabel=(article_id,label_id)=>{
      console.log(list);
      console.log(article_id,label_id);
      loading.value = true;
      label.DeleteLabeRelationlByArticleId(article_id,label_id).then(
        (response)=>{
          loading.value = false;
          console.log(response);
          if(response.success){
            //如果请求成功，需要在前端删除相关的标签
            list.forEach(article => {
              if(article.id == article_id){
                article.labelList.forEach((label, index, labels)  => {
                  if(label.label_id==label_id){
                    labels.splice(index, 1);
                  }
                });
              }
            });
            ElMessage.success({
              title:"请求成功",
              message:"标签删除成功"
            })
          }
        }
      ).catch(
        (error)=>{
          loading.value = false;
          console.log(error);
        }
      )
    };

    // 生成随机颜色，用于给tag配色
    const randomColor = (label_name)=>{
        return randomcolor({
          seed:label_name+(new Date() .getDate()),
          luminosity:"bright"
        });
    }

    /**
     * 初始化方法
     */
    getArticleList()

    return {
      list,
      loading,
      current_page,
      last_page,
      page,

      setRemove,
      change,
      getArticleList,
      handleEdit,
      deleteLabel,
      randomColor
    }

  }
};
</script>
<style lang="scss" scoped></style>
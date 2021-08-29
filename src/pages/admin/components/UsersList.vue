<template>
  <div v-loading="loading">
    <el-table v-if="list" :data="list" style="width: 100%">
      <el-table-column label="ID">
        <template #default="scope">
          <span style="">{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="用户名">
        <template #default="scope">
          <span style="">{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="email">
        <template #default="scope">
          <span style="">{{ scope.row.email }}</span>
        </template>
      </el-table-column>

      <el-table-column label="手机号">
        <template #default="scope">
          <span style="">{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="个人介绍">
        <template #default="scope">
          <span style="">{{ scope.row.intro }}</span>
        </template>
      </el-table-column>

      <el-table-column label="创建日期">
        <template #default="scope">
          <span style="">{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>

      <el-table-column label="冻结用户">
        <template #default="scope">
          <el-switch
            v-if="scope.row.id"
            v-model="scope.row.deleted"
            :active-value="true"
            :inactive-value="false"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="setDelete($event,scope.row.id)"
          >
          </el-switch>
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
import { reactive,ref } from 'vue';
import user from "../../../api/admin/user.js"
import { ElMessage } from 'element-plus';
export default {
  name: "UsersList",
  setup(){
    /**
     * 静态数据部分
     */
    const list = reactive([]);
    const loading = ref(false);
    const current_page = ref(1);
    const last_page = ref(1);

    /**
     * method部分
     */
    
    const getUserList = ()=>{
      loading.value = true;

      user.QueryUsersByPage(current_page.value).then(
        (response)=>{
          while(list.length>0)list.pop();
          list.push(...response.data.user_list);
          loading.value = false;
          last_page.value = response.data.last_page;
          current_page.value = response.data.current_page;
          list.forEach(user => {
            if(user.deleted_at!=null){
              user.deleted = true;
            }else{
              user.deleted = false;
            }
          });
          ElMessage.success("数据请求成功")
        }
      ).catch(
        (error)=>{
          ElMessage.error(error)
        }
      )
    };
    const change = (page)=>{
      console.log(page);
      current_page.value = page;
      getUserList();
    };
    const setDelete=(state,id)=>{
      console.log(state);
      user.setUserOffline(state,id).then(
        (response)=>{
          ElMessage.success(response)
        }
      ).catch(
        (error)=>{
          ElMessage.error(error)
        }
      )
    };

    /**
     * 初始化操作
     */

    getUserList()


    return{
      list,
      loading,
      current_page,
      last_page,

      getUserList,
      change,
      setDelete

    }
  },
};
</script>
<style lang="scss" scoped></style>
<template>
  <div v-loading="loading">
    <el-table v-if="list" :data="list" style="width: 100%">
      <el-table-column label="ID">
        <template #default="scope">
          <span style="">{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="回复内容">
        <template #default="scope">
          <span style="">{{ scope.row.message }}</span>
        </template>
      </el-table-column>

      <el-table-column label="用户ID">
        <template #default="scope">
          <span style="">{{ scope.row.user_id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="回复类别(文章id)">
        <template #default="scope">
          <span style="">{{
            scope.row.article_id == 0 ? "网站回复" : scope.row.article_id
          }}</span>
        </template>
      </el-table-column>

      <el-table-column label="申请日期">
        <template #default="scope">
          <span style="">{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="是否显示"
        prop="deleted_at"
        width="100"
        :filters="[
          { text: '已添加', value: true },
          { text: '未添加', value: false },
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template #default="scope">
          <el-switch
            v-if="scope.row.id"
            v-model="scope.row.deleted"
            :active-value="false"
            :inactive-value="true"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="setMessRemoved($event,scope.row.id)"
          >
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index)"
            icon="el-icon-edit"
            type="primary"
            circle
          ></el-button>
          <el-button
            v-if="scope.row.hasReply"
            type="warning"
            icon="el-icon-message"
            size="mini"
            @click="QueryReplyList(scope.$index)"
            circle
          ></el-button>
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
      @current-change="NextPage"
      style="display: flex; justify-content: center; margin-bottom: 10px"
    >
    </el-pagination>
    <!-- 添加回复对话框 -->
    <el-dialog :title="title" v-model="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="回复内容" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="2"
            v-model="form.Info"
            autocomplete="off"
            placeholder="请输入回复内容"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addReply">确 定</el-button>
        </div>
      </template>
    </el-dialog>
    <!-- 查看评论对话框 -->
    <el-dialog title="评论查看" v-model="dialogReplyVisible">
      <el-table v-if="list" :data="replyList" height="350" style="width: 100%">
        <el-table-column label="ID">
          <template #default="scope">
            <span style="">{{ scope.row.id }}</span>
          </template>
        </el-table-column>

        <el-table-column label="评论内容">
          <template #default="scope">
            <span style="">{{ scope.row.info }}</span>
          </template>
        </el-table-column>

        <el-table-column label="用户ID">
          <template #default="scope">
            <span style="">{{ scope.row.userId }}</span>
          </template>
        </el-table-column>

        <el-table-column label="回复id">
          <template #default="scope">
            <span style="">{{ scope.row.messId }}</span>
          </template>
        </el-table-column>

        <el-table-column label="评论日期">
          <template #default="scope">
            <span style="">{{ scope.row.createdAt }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="是否显示"
          prop="deleted_at"
          width="100"
          :filters="[
            { text: '已添加', value: '1' },
            { text: '未添加', value: '0' },
          ]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template #default="scope">
            <el-switch
              v-if="scope.row.id"
              v-model="scope.row.deleted"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="setReplyRemoved($event,scope.row.id)"
            >
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import {ref,reactive} from "vue"
import { ElMessage } from 'element-plus';
import message  from "@/api/admin/message";
import reply from "@/api/admin/reply"
import { useStore } from 'vuex';
export default {
  name: "MessageList",
  setup(){
    /**
     * const 
     */
    const store = useStore();
    const list = reactive([]);
    const current_page = ref(1);
    const loading = ref(false);
    const last_page = ref(1);
    const title = ref("回复评论");
    const dialogFormVisible = ref(false);
    const dialogReplyVisible = ref(false);
    const replyList = reactive([]);
    const form = reactive({
      messId:"",
      Info:"",
      userId:store.state.user.user.id,
      address:"湖北-武汉"
    });
    const formLabelWidth = ref("120px");
    /**
     * method
     */
    const handleEdit = (index)=>{
      form.messId = list[index].id;
      dialogFormVisible.value = true;
      console.log(store.state.user);
    };

    //换页
    const NextPage=(page)=>{
      current_page.value = page;
      QueryMessList();
    }; 


    //获取信息列表
    const QueryMessList= ()=>{
      loading.value = true;
      message.QueryMessageByPage(current_page.value).then(
        (response)=>{
          //数组清空
          while(list.length>0)list.pop();
          console.log(response);

          list.push(...response.data.message_list)
          loading.value = false;
          last_page.value = response.data.last_page;
          current_page.value = response.data.current_page;

          list.forEach(message => {
            if(message.deleted_at!=null){
              message.deleted = true;
            }else{
              message.deleted = false;
            }
          });

          ElMessage.success({
            message: "获取成功",
            type: "success",        
          })
        }
      ).catch(
        (error)=>{
          console.log(error);
        }
      )
    };

    const QueryReplyList = (index)=>{
      reply.QueryReplyByMessId(list[index].id).then(
        (res)=>{
          while(replyList.length>0)replyList.pop();
          replyList.push( ... res.data.reply_list);
          dialogReplyVisible.value = true;
          replyList.forEach(reply => {
            if(reply.deleted_at!=null){
              reply.deleted = true;
            }else{
              reply.deleted = false;
            }
          });
          ElMessage.success({
            message: "获取成功",
            type: "success",          
          })
        }
      ).catch(
        (error)=>{
          console.log(error);
        }
      )
    };
    // 回复评论
    const addReply = ()=>{
      console.log(form);
      reply.AddReply(form).then(
        (res)=>{
          ElMessage.success(res.message)
          dialogFormVisible.value = false;
          QueryMessList()
        }
      ).catch(
        (error)=>{
          console.log(error);
          dialogFormVisible.value = false
        }
      )
    };
    const setMessRemoved = (state,id)=>{
      message.setMessageRemove(state,id).then(
        (res)=>{
          ElMessage.success(res.message)
        }
      ).catch(
        (error)=>{
          ElMessage.error(error.message)
        }
      )
    }

    const setReplyRemoved = (state,id)=>{
      reply.setReplyRemove(state,id).then(
        (res)=>{
          ElMessage.success(res.message)
        }
      ).catch(
        (error)=>{
          ElMessage.error(error.message)
        }
      )
    }

    const filterTag = (value, row)=>{
      console.log(value + ".." + row.apply);
      return row.apply === value;
    };

    // 初始化
    QueryMessList()
    return{
      list,
      current_page,
      last_page,
      loading,
      title,
      dialogFormVisible,
      dialogReplyVisible,
      form,
      formLabelWidth,
      replyList,

      handleEdit,
      QueryMessList,
      NextPage,
      QueryReplyList,
      setMessRemoved,
      setReplyRemoved,
      addReply,
      filterTag

    }
  },
  methods: {


    // load(tree, treeNode, resolve) {
    //     console.log(tree)
    //      let that=this
    //     that.$get('reply/list?id='+tree.id)
    //     .then(function(res){
    //         console.log(res)
    //         resolve(res.data)
    //         that.$message({
    //                 message:'获取成功',
    //                 type: 'success'
    //         });
    //     })
    //     .catch(()=>{
    //     })
    // },

    // 格式化list deleted_at数据
  },
};
</script>
<style lang="scss" scoped></style>
<template>
  <div class="article">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
      <el-row>
        <el-col :md="12" :sm="24" class="title">
          <el-form-item label="文章标题" prop="title">
            <el-input
              v-model="form.title"
              placeholder="请输入文章标题"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" class="cover">
          <el-form-item label="文章封面:" class="article-img">
            <el-upload
              class="avatar-uploader"
              :action="imgServe"
              :headers="Authorization"
              list-type="picture-card"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="form.img" :src="form.img" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="12" :sm="24">
          <el-form-item label="文章介绍" prop="description">
            <el-input
              v-model="form.description"
              type="textarea"
              autosize
              placeholder="请输入文章介绍"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <!-- <el-col :md="12" :sm="24">
          <el-form-item label="文章类别" prop="classty">
            <el-select
              style="width: 100%"
              v-model="form.classty"
              filterable
              allow-create
              default-first-option
              placeholder="请选择文章类别"
            >
              <el-option
                v-for="item in classtyList"
                :key="item.classty"
                :label="item.classty"
                :value="item.classty"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col> -->
        <el-col :md="12" :sm="24">
          <el-form-item label="文章标签" prop="label">
            <!-- <el-input v-model="form.label" placeholder="多个标签使用逗号分隔"></el-input> -->
            <el-select
              style="width: 100%"
              v-model="form.label"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="请选择文章标签"
            >
              <el-option
                v-for="item in labelList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :md="6" :sm="12" :xs="24">
          <el-form-item label="创建时间">
            <el-date-picker
              v-model="form.created"
              type="datetime"
              placeholder="选择时间"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :xs="24">
          <el-form-item label="图床">
            <el-select v-model="imgType" placeholder="请选择">
              <el-option
                v-for="item in imgService"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :xs="24">
          <el-form-item label="浏览量">
            <el-input-number
              v-model="form.click"
              :min="1"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :xs="24">
          <el-form-item label="点击量">
            <el-input-number
              v-model="form.likes"
              :min="1"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :md="4" :sm="8" :xs="12">
          <el-form-item label="首页显示">
            <el-switch
              v-model="form.isShow"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ccc"
            >
            </el-switch>
          </el-form-item>
        </el-col>
        <el-col :md="4" :sm="8" :xs="12">
          <el-form-item label="标题显示">
            <el-switch
              v-model="form.headShow"
              :active-value="true"
              :inactive-value="false"
              active-color="#13ce66"
              inactive-color="#ccc"
            >
            </el-switch>
          </el-form-item>
        </el-col>
        <el-col :md="4" :sm="8" :xs="12">
          <el-form-item label="分享显示">
            <el-switch
              v-model="form.shareShow"
              :active-value="true"
              :inactive-value="false"
              active-color="#13ce66"
              inactive-color="#ccc"
            >
            </el-switch>
          </el-form-item>
        </el-col>
        <el-col :md="4" :sm="8" :xs="12">
          <el-form-item label="版权显示">
            <el-switch
              v-model="form.copyrightShow"
              :active-value="true"
              :inactive-value="false"
              active-color="#13ce66"
              inactive-color="#ccc"
            >
            </el-switch>
          </el-form-item>
        </el-col>
        <el-col :md="4" :sm="8" :xs="12">
          <el-form-item label="留言显示">
            <el-switch
              v-model="form.messageShow"
              :active-value="true"
              :inactive-value="false"
              active-color="#13ce66"
              inactive-color="#ccc"
            >
            </el-switch>
          </el-form-item>
        </el-col>
        <el-col :md="4" :sm="8" :xs="12">
          <el-form-item label="提交收录">
            <el-switch
              v-model="form.seo"
              :active-value="true"
              :inactive-value="false"
              active-color="#13ce66"
              inactive-color="#ccc"
            >
            </el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <channels :title="form.title" :content="form.content" :tags="form.label"></channels> -->
      <div style="display: flex; justify-content: center; margin-bottom: 10px">
        <el-button style="width: 50%" @click="onSubmit()">发布</el-button>
      </div>
      <v-md-editor
        v-model="form.content"
        :disabled-menus="[]"
        @upload-image="handleUploadImage"
        style="height: 100vh"
        ref="md"
      ></v-md-editor>
    </el-form>
  </div>
</template>
<script>
import { useStore } from 'vuex';
// import router from '@/pages/admin/router'
import {useRoute } from "vue-router"
import {ref,reactive,unref,computed} from "vue"
import { ElMessage } from 'element-plus';
import label from "../../../api/admin/label";
import article from "../../../api/admin/article";

export default {
  name: "ArticlesAdd",
  setup(){
    const store = useStore();
    const route = useRoute();
    
    const Authorization = reactive({
      Authorization:store.state.user.token
    })
    const type = ref("add")
    const imgType = ref("gitee")
    const checkboxGroup1 = reactive([]);
    const labelList = reactive([]);
    const formRef = ref(null);
    const imgService = reactive([
      {
          name: "码云",
          value: "gitee",
      }
    ]);
    const form = reactive({
        title: "",
        description: "",
        content: "",
        img: "",
        created:"",
        label: "",
        click: true,
        likes: true,
        isShow: true,
        headShow: true,
        shareShow: true,
        copyrightShow: true,
        messageShow: true,
        seo: 1,
      });
    const rules =  reactive({
        title: [{ required: true, message: "标题不可为空", trigger: "blur" }],
        description: [{ required: true, message: "介绍不可为空", trigger: "blur" }],
        label: [{ required: true, message: "标签不可为空", trigger: "blur" }],
      });
    
    const imgServe = computed({
      get:()=>{
          return `${process.env.VUE_APP_API_URL}/articles/uploadImg?type=${imgType.value}`;
        }
      }
    );
    

    /**
     * method
     */
    const getArticle = ()=>{
    let id = route.params.id;
    if(id!=null)
      article.QueryArticleById(id).then(
        (res) =>{
          form.title = res.data.article.title;
          form.description = res.data.article.description;
          form.content = res.data.article.content;
          form.img = res.data.article.img;
          form.label = res.data.labelList;
          form.click = res.data.article.click;
          form.likes = res.data.article.likes;
          form.isShow = res.data.article.isShow ;
          form.headShow = res.data.article.headShow ;
          form.shareShow = res.data.article.shareShow ;
          form.copyrightShow = res.data.article.copyrightShow ;
          form.messageShow = res.data.article.messageShow ;
          form.created =  res.data.article.createdAt;
        })
        .catch(function () {});
    };
    const onSubmit = async ()=>{
      // 为表单绑定验证功能
      let form = unref(formRef)
      console.log(form);
      if(!form)return
      try{
        await form.validate();
        submit();
      }
      catch(error){
        console.log(error);
      }
    };
    const submit = ()=>{
      let form = unref(formRef)
      let formdata = {
        labels:form.model.label,
        article:form.model
      }
      article.AddNewArticle(formdata).then(
       (res)=>{
          console.log(res);
          // store.commit("article", {
          //   id: res.data.id,
          //   title:form.title,
          //   content: form.content,
          //   tags: form.label,
          // });
          console.log("请求成功");
          ElMessage.success({
            title:"编写文章完成",
            message: res.message,
          });

          // router.push("/home/articles/list");
        })
        .catch(function () {});
    };
    // 绑定@imgAdd event
    const handleUploadImage = (event, insertImage, files)=>{
      const that = this;
      // 第一步.将图片上传到服务器.
      let param = new FormData(); // 创建form对象
      param.append("file", files[0]); // 通过append向form对象添加数据
      param.append("chunk", "0"); // 添加form表单中其他数据'
      console.log(param);
      this.$post("/apis/admin/pictures/add?type=" + that.imgType, param).then(
        (response) => {
          insertImage({
            url: response.data.path,
            description: files[0].name,
          });
        }
      );
    };

    const handleAvatarSuccess =(res)=>{
      console.log(res);
      form.img = res.data.url
    };

    const beforeAvatarUpload = (file)=>{
      const arr = [
        "image/jpeg",
        "image/gif",
        "image/jpg",
        "image/png",
        "image/x-png",
        "image/pjpeg",
      ];
      const isJPG = arr.indexOf(file.type) >= 0;
      const isLt2M = file.size / 1024 / 1024 < 1;

      if (!isJPG) {
        ElMessage.error("上传头像格式不正确格式!");
      }
      // 因为码云的相关设置要求，图像数据如果超过1M，就需要用户登录才能进行访问，因此暂时做现在
      // TODO 图像大小跳转
      if (!isLt2M) {
        ElMessage.error("上传图片大小不能超过 1MB!");
      }
      return isJPG && isLt2M;
    };

    /**
     * 初始化部分，从网络请求需要label标签和类别标签
     */
    label.QueryAllLabels().then(
      (response)=>{
        labelList.push(... response.data.labels)
      }
    )
    getArticle();


    return{
      store,
      type,
      imgType,
      checkboxGroup1,
      labelList,
      imgService,
      form,
      formRef,
      rules,
      imgServe,
      Authorization,

      getArticle,
      submit,
      onSubmit,
      handleUploadImage,
      beforeAvatarUpload,
      handleAvatarSuccess
    }
  },
  //可以是新建文章，也可以是修改文章，如果传递了参数就是修改文章
  // created() {
  //   let id = this.$route.params.id;
  //   this.form.id = id;
  //   if (id) {
  //     this.getArticle();
  //     this.type = "update";
  //     this.form.seo = 0;
  //   }
  // },
};
</script>
<style lang="scss" scoped>
.article >>>.v-md-editor--fullscreen {
  z-index: 99999;
}
.article{
    .avatar-uploader{
          position: absolute;
          left: 30%;
          top: 50%;
          z-index: 1111;
          .avatar{
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          >>>.el-upload--picture-card{
                height: 110px;
                width: 110px;
                line-height: 110px;
            }
    }
}

.el-input-number :deep() .el-input-number__decrease{
    top:2px;
}
.el-input-number :deep() .el-input-number__increase{
  top: 2px;
}
@media (max-width:992px) {
  .article{
    .cover{
      order: 0
    }
    .title{
      order: 1
    }
    .avatar-uploader{
          position: relative;
          >>>.el-upload--picture-card{
                height: 110px;
                width: 110px;
                line-height: 110px;
            }
    }
}
}
</style>
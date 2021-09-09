<template>
  <div class="senContainer">
      <el-table style="width: 100%"
			v-loading="loading" 
			:data="senList">
          <el-table-column
            label="id"
            width="80"
          >
					<template #default="scope">
						<span>{{ scope.row.id }}</span>
					</template>
          </el-table-column>
          <el-table-column
            label="内容"
          >
						<template #default="scope">
							<span>{{ scope.row.content }}</span>
						</template>
          </el-table-column>
          <el-table-column
            label="作者"
          >
						<template #default="scope">
							<span>{{ scope.row.author }}</span>
						</template>
          </el-table-column>
          <el-table-column
            label="创建时间"
          >
						<template #default="scope">
							<span>{{ scope.row.created_at }}</span>
						</template>
          </el-table-column>
          <el-table-column
            label="背景图像"
          >
						<template #default="scope">
							<span>
								<el-image :src="scope.row.background" style="width:50px;" fit="scale-down">
									<template #error>
										<div class="image-slot">
											<i class="el-icon-picture-outline"></i>
										</div>
									</template>
								</el-image>
							</span>
						</template>
          </el-table-column>
        <el-table-column
            label="修改"
            width="180"
          >
        <template #default="scope">
            <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
          </el-table-column>
      </el-table>
			<div class="addSen">
				<el-button class="addBtn" @click="dialogVisible = true" type="primary" round>新增每日一句</el-button>
			</div>
			<el-dialog  custom-class="addDialog" v-model="dialogVisible" width="30%">
				<template #title>
					<div style="text-align:center;font-size:18px" >
						<span> 新增句子</span>
						<div style="width:100%;height:2px;background:#eee;margin-top:8px"></div>
					</div>
				</template>
				<el-form label-width="100px" :model="AddForm" :rules="formRules" ref="AddFormRef" >
					<el-form-item label="句子内容：" prop="content">
						<el-input class="input" v-model="AddForm.content"></el-input>
					</el-form-item>
					<el-form-item label="作者：" prop="author">
						<el-input class="input" v-model="AddForm.author" ></el-input>
					</el-form-item>
					<el-form-item label="创建日期："  prop="createdAt">
						<el-date-picker class="input" value-format = "YYYY-MM-DD" v-model="AddForm.createdAt"></el-date-picker>
					</el-form-item>
					<el-form-item label="上传图片：" prop="background">
						<el-upload class="avatar-uploader"
								:before-upload="beforeBcgUpload" 
								v-model="AddForm.background"
								:action="imgServer"
								:on-success="handleBcgSuccess"
								:headers = "Authorization"
								:show-file-list="false"
								multiple = "false"
								limit=1
							>
							<img v-if="AddForm.background" :src="AddForm.background" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>
					<el-form-item >
						<div style="text-align:center;margin-right:100px">
							<el-button type="primary" @click="onSubmit">提交</el-button>
							<el-button type="danger" @click="dialogVisible = false">关闭</el-button>
						</div>
					</el-form-item>
				</el-form>
			</el-dialog>
			<div style="text-align:center">
				<el-pagination
					style="margin:20px 100px 0 0"
					layout="prev, pager, next" 
					v-model:current-page = "current_page"
					v-model:page-count = "page_count"
					@current-change = "pageChange($event)"
					prev-text = "上一页"
					next-text = "下一页"
					>
				</el-pagination>
			</div>

  </div>
</template>

<script>

import { computed, reactive } from '@vue/reactivity'
import {ref, unref} from "vue"
import { ElMessage,ElLoading } from 'element-plus'
import sentence from "../../../api/admin/sentence";
import { useStore } from 'vuex';

export default {
	name:"sentenceList",
	setup(){
		const store = useStore();
		const AddFormRef = ref(null);
		const senList = reactive([])
		const loading = ref(false);
		const dialogVisible = ref(false);
		const imageUrl = ref("")
		const formRules =reactive({
			content:{
				required:true,
				type:'string',
				message:"输入句子内容",
				trigger:"blur"
			},
			author:{
				required:true,
				type:'string',
				message:"请输入作者",
				trigger:"blur"				
			},
			created_at:{
				required:true,
				type:'date',
				message:"请输入创建时间",
				trigger:"blur"				
			},
			background:{
				type:'url',
				message:"请上传文件",
				trigger:"blur"				
			},
		})


		const Authorization = reactive({
      Authorization:store.state.user.token
    });
		const current_page = ref(1);
		const page_count = ref(2);
		const AddForm = reactive({
			id:null,
			content:"",
			author:"",
			createdAt:"",
			background:"",
		})

		//上传文件前检查 文件大小
		const beforeBcgUpload = (file)=>{
			console.log(file.type);
      const arr = [
        "image/jpeg",
        "image/gif",
        "image/jpg",
        "image/png",
				"image/bmp",
				"image/jpeg"
      ];
			const isJPG = arr.indexOf(file.type) >=0 ;
			const isLt2M = file.size / 1024 / 1024 < 1;

			if (!isJPG) {
				ElMessage.error('上传文件必须为图片格式');
			}
			if (!isLt2M) {
				ElMessage.error('上传头像图片大小不能超过 1MB!');
			}
			return isJPG && isLt2M;		
		}

		const onSubmit = async ()=>{
			let form = unref(AddFormRef);
			form.validate((valid) => {
          if (valid) {
						
						submitForm(form.model);
					} else {
            ElMessage.error("表单验证失败，请检查内容是否正确填写")
            return false;
          }
      });
		}

		const submitForm = (form)=>{
			// 进行 页面 loading 
			const loading = ElLoading.service({
				lock: true,
				text: 'Loading',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)',
			});

			if(form.id!=null){
				sentence.UpdateById(form).then((res) => {
					// 关闭加载，关闭输入框 ，进行数据的重绘
					loading.close();

					//更新表格内的数据	
					senList[form.index].created_at = res.data.sentence.createdAt;
					senList[form.index].background = res.data.sentence.background;
					senList[form.index].content = res.data.sentence.content;
					senList[form.index].author = res.data.sentence.author;					

					// 清空表格
					unref(AddFormRef).resetFields();

					dialogVisible.value = false;

				}).catch((err) => {
					loading.close();
					ElMessage.err(err)
				});
			}
			else{
				sentence.AddNewSentence(form).then((res) => {
					// 关闭加载，关闭输入框 ，进行数据的重绘
					loading.close();
					//更新表格内的数据
					res.data.sentence.created_at = res.data.sentence.createdAt;	
					senList.push(
						res.data.sentence
					)
					// 清空表格
					unref(AddFormRef).resetFields();

					dialogVisible.value = false;

				}).catch((err) => {
					loading.close();
					ElMessage.err(err)
				});
			}

		};
		const handleEdit = (index,content)=>{
			AddForm.index = index;
			AddForm.id = content.id;
			AddForm.content = content.content;
			AddForm.createdAt = content.created_at;
			AddForm.author = content.author;
			AddForm.background = content.background;
			dialogVisible.value = true;
		}

		const handleDelete = (index,content)=>{
			let id = content.id;
			sentence.DeleteById(id).then(
				res => {
					if(res.success){
						ElMessage.success("内容删除成功")
						senList.splice(index, index+1);
					}else{
						ElMessage.warning(res.message)
					}
				}
			).catch(
				err =>{
					ElMessage.err(err)
				}
			)

		}

		const handleBcgSuccess = (res)=>{
			if(res.success){
				AddForm.background = res.data.url;
			}else{
				ElMessage.error(res.message);
			}
		}

		const initSenList = ()=>{
			pageChange(1);
		}

		const pageChange = (index)=>{
			//发送请求更新数据
			sentence.QuerySentenceByPage(index).then(
				res =>{
					while(senList.length>0)senList.pop();
					senList.push( ... res.data.sentence_list);
					current_page.value = res.data.current_page;
					page_count.value = res.data.last_page;
				}
			).catch(
				err =>{
					ElMessage.error(err)
				}
			)
		}

		const imgServer = computed({
			get:()=>{
				return `${process.env.VUE_APP_API_URL}/articles/uploadImg`; 
			}
		})

		initSenList();

		return {
			senList,
			loading,
			dialogVisible,
			imageUrl,
			AddForm,
			beforeBcgUpload,
			formRules,
			AddFormRef,
			current_page,
			Authorization,
			imgServer,


			onSubmit,
			submitForm,
			handleEdit,
			handleDelete,
			initSenList,
			page_count,
			pageChange,
			handleBcgSuccess
		}
	}
}
</script>

<style lang="scss">
.senContainer{
	.cell{
		text-align: center;
		padding: 0 10px;
	}


	.addSen{
		margin-top: 20px;
		text-align: center;
		.addBtn{
			margin-right: 100px;
		}
	}

	.addDialog{
		border-radius: 20px;
		.input{
			width:50%;
		}


		.avatar-uploader .el-upload {
			border: 1px dashed #d9d9d9;
			border-radius: 6px;
			cursor: pointer;
			position: relative;
			overflow: hidden;
		}
		.avatar-uploader .el-upload:hover {
			border-color: #409EFF;
		}
		.avatar-uploader-icon {
			font-size: 28px;
			color: #8c939d;
			width: 178px;
			height: 178px;
			line-height: 178px;
			text-align: center;
		}
		.avatar {
			width: 178px;
			height: 178px;
			display: block;
		}
	}
}
</style>
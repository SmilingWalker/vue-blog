// import Vue from "vue"
import axios from "axios"
import store from '@/pages/admin/store/index';
import router from '@/pages/admin/router'
import base from "@/api/base.js"
import { ElNotification } from 'element-plus';


/**
 * 管理系统的，博客的后台请求封装 
 */


//创建 axios实例 
let instance = axios.create({
    baseURL:base.admin,
    timeout:5000
})

/**
 * 添加请求拦截器
 */
instance.interceptors.request.use(config=>{
        //如果当前状态信息内有token数据，就携带token数据
        if(store.state.user.token!=""){
            config.headers.Authorization = store.state.user.token;
            console.log('interceptors config=',config)
        }
        return config;
    },error=>{
        Promise.error(error)
    }
)


/**
 * response拦截器
 */
 instance.interceptors.response.use(
     (response) => {
    // 对响应数据做点什么
    // 如何响应的头部信息内，具有token数据，不过本次后端的token都是直接以Json形式在返回体内实现的
    // if (response.headers.authorization) {
    //     store.dispatch("setToken", response.headers.authorization);
    // }
        if (response.data.code == 200) {

            return Promise.resolve(response.data)
        } else {
            ElNotification.warning({
                title: '错误提示',
                message: response.data.message,
            });
        }
        // 打印错误信息
        return Promise.reject(response.data)
    }, 
    error => {
        /**
         * 请求发送错误，后台没有正常返回数据，
         */
        switch (error.response.status) {
            case 400:
                ElNotification.warning({
                    title: '用户登录提示',
                    message: error.response.data.message,
                    onClose() {
                        store.dispatch("Logout");
                        router.push('/login')
                    },
                });
                break;
            case 401:
                ElNotification.warning({
                    title: '请求参数有误',
                    message: error.response.data.message,
                });
                break;
            case 403:
                ElNotification.warning({
                    title: '用户权限提示',
                    message: error.response.data.message,
                    onClose() {
                        router.push('/login')
                    },
                });
                break;
            case 404:
                ElNotification.warning({
                    title: '访问路径不正确',
                    message: error.response.data.message,
                });
                break;
            case 422:
                ElNotification.warning({
                    title: '温馨提示',
                    message: error.response.data.message,
                    onClose() {
                        store.dispatch("logOut")
                        router.push('/login')
                    },
                });
                break;
            case 500:
                ElNotification.error({
                    title: '网络提示',
                    message: '服务器连接失败，请稍后再试',
                });
                break;
            default:
                ElNotification.error({
                    title: '错误提示 ' + error.response.status,
                    message: error.response.data.message,
                });

        }

});

export default instance;
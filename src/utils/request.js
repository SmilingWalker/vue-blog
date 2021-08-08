import Vue from "vue"
import axios from "axios"
import store from '@/store/index';

import base from "@/api/base.js"
let instance = axios.create({
    baseURL:base.blog,
    timeout:5000
})




export default instance
import axios from "@/utils/requestAdmin"
import qs from "qs"

const article = {
    QueryAllArticles(){
        return axios.get(
            "/articles"
        )
    },
    QueryArticleById(id){

        return axios.post(
                "/articles/content",
                qs.stringify({id})
            )
    },
    AddNewArticle(formdata){
        return axios.post(
                "/articles/add",
                formdata,
            )
    },
    QueryArticlesByPage(page){
        return axios.post(
            "/articles/pages",
            {
                page
            }
        )
    },
    SetArticleOffShow(isShow,id){
        return axios.post(
            "/articles/offshow",
            qs.stringify({
                isShow,
                id
            })
        )
    }

}

export default article;
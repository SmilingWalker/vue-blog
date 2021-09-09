import axios from "@/utils/requestAdmin"
import qs from "qs"
const blog = {
    QueryAllLabels(){
        return axios.get(
            "/labels/all"
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
    QueryArticleById(id){
        return axios.post(
                "/articles/content",
                qs.stringify({id})
            )
    },
    QueryMessageByArticleId(articleId){
        return axios.post(
            "/message/query/article",
            qs.stringify({articleId})
        )
    }    
}

export default blog;
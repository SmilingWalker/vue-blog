import axios from "@/utils/requestAdmin"

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
}

export default blog;
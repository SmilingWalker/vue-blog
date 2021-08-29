import axios from "@/utils/requestAdmin"
import qs from "qs"
const label = {
    QueryAllLabels(){
        return axios.get(
            "/labels/all"
        )
    },
    DeleteLabeRelationlByArticleId(articleId,labelId){
        return axios.post(
            '/labels/relation/delete',
            qs.stringify({
                articleId:articleId,
                labelId:labelId
            })
        )
    }
}

export default label;
import axios from "@/utils/requestAdmin"
import qs from "qs"
const message = {
    QueryMessageByPage(page){
        return axios.post(
            "/message/pages",
            qs.stringify({
                page
            })
        )
    },
    setMessageRemove(state,id){
        return axios.post(
            "/message/offshow",
            qs.stringify({
                state,
                id
            })
        )
    }
}

export default message;
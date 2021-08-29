import axios from "@/utils/requestAdmin"
import qs from "qs"
const reply = {
    QueryReplyByPage(page){
        return axios.post(
            "/reply/pages",
            qs.stringify({
                page
            })
        )
    },
    QueryReplyByMessId(messageId){
        return axios.post(
            "/reply/messId",
            qs.stringify({
                messageId
            })
        )
    },
    setReplyRemove(state,id){
        return axios.post(
            "/reply/offshow",
            qs.stringify({
                state,
                id
            })
        )
    },
    AddReply(form){
        return axios.post(
            "/reply/add",
            form,
        )
    }
}

export default reply;
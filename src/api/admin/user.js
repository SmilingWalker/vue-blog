import axios from "@/utils/requestAdmin"
import qs from "qs"

const user = {
    AdminLogin(formdata){
        return axios.post(
            "/users/login"
            ,qs.stringify(formdata)
        )
    },
    QueryUsersByPage(page){
        return axios.post("/users/pages",
        qs.stringify({page})
        )
    },
    setUserOffline(state,id){
        return axios.post("/users/offline",
        qs.stringify({
            state,
            id,
        })
        )
    }
}

export default user;
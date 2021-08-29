import axios from "@/utils/requestAdmin"

const category = {
    QueryAllCategory(){
        return axios.get(
            "/category/all"
        )
    }
}

export default category;
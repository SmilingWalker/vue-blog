const user = {
    state:{
        user:'',
        token:localStorage.getItem('token')||''
    },
    mutations:{
        setUserInfo(state,info){
            state.user = {...state.user,...info} 
        },
        setToken(state,token){
            state.token = token;
        },
        logOut(state) { //退出
            state.token = ''
            state.user = ''
        },
    },
    actions:{
        
    }

}


export default user

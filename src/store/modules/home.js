const user = {
    state:{
        musicList:[],
        showLogin:false
    },
    mutations:{
        showLogDia(state){
            state.showLogin = true
        },
        closeLogDia(state){
            state.showLogin = false
        }
    },
    actions:{
        
    }

}


export default user;
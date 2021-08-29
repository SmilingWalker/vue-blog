const user = {
    state:{
        musicList:[],
        showLogin:false,
        showSign:false,
    },
    mutations:{
        showLogDia(state){
            state.showLogin = true
        },
        closeLogDia(state){
            state.showLogin = false
        },
        showSignDia(state){
            state.showSign = true;
        },
        closeSignDia(state){
            state.showSign = false; 
        }
    },
    actions:{
        
    }

}


export default user;
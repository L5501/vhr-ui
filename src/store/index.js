import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        routes:[]
    },
    mutations:{
        // 传参的时候只要传data就行,state可以不传
        initRoutes(state,data){
            state.routes = data;
        }
    },
    actions:{

    }
})

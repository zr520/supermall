import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

//安装插件
Vue.use(Vuex)

//state
const state = {
    cartList:[],
}
//创建Store对象
const store = new Vuex.Store({
    state,
    actions,
    mutations,
    getters
})

//导出Vuex
export default store
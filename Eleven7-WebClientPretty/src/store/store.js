import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'
import {Snackbar} from './storeModules/snackbackModule.js'
import {EmployeesModule} from './storeModules/employeeStore'
import {UserModule} from './storeModules/userModule'
Vue.use(Vuex)

const state = {
   drawerState : false
}

const mutations = {
  [types.OPEN_DRAWER](state){
    state.drawerState = !state.drawerState;
   },
  [types.SET_DRAWER](state, {val}){
    state.drawerState = val;
  }
}

const getters = {
  getDrawerState: state => state.drawerState,
}

const actions = {
  openDrawer({commit}){
    commit(types.OPEN_DRAWER);
  },
  setDrawer({commit}, payload){
    let val = payload.val;
    commit(types.SET_DRAWER, {val});
  }

}

const modules = {
  Snackbar, EmployeesModule, UserModule
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules,
  strict: process.env.NODE_ENV !== 'production',
})
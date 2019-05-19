import * as types from '../mutation-types'


const state = {
    snackbar_text : ""
  }
  
  const mutations = {
    [types.SET_SNACK](state, { txt}){
      console.log("Mutation SET_SNACK : "+ txt);
      state.snackbar_text = txt;
     },
  }
  
  const getters = {
    getSnackbarText: state => state.snackbar_text
  }
  
  const actions = {
    setSnackbar({commit}, payload){
      let txt = payload.text;
      console.log(payload)
      commit(types.SET_SNACK, {txt});
    }
  }

export const Snackbar = {
    namespaced: false,
    state,
    getters,
    mutations,
    actions
  };
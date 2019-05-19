import * as types from '../mutation-types'
import * as auth from '../../services/auth';
import * as employee from '../../services/employeeService';
import router from './../../router'

const state = {
    is_auth : false,
    user : {
      email_address : '',
      employee_id: -1,
      first_name: '',
      last_name: '',
      store_id : -1,
      birthdate : '',
      lvl_permission : -1,
      phone_number: -1
    }
  }
  
  const mutations = {
    setMain_M(state, {res}){
      state.user.email_address = res.email_address;
      state.user.first_name = res.first_name;
      state.user.last_name = res.last_name;
      state.user.store_id = res.store_id;
      state.user.birthdate = res.birthdate;
      state.user.lvl_permission = res.job_level;
      state.user.phone_number = res.phone_number;
    },
    setAuth_M(state, {valid}){
      state.is_auth = valid;
    }

  }
  
  const getters = {
    getAuth: state => state.is_auth,
    getUserInfo: state => state.user,
  }
  
  const actions = {
    setAuth({commit}, payload){
      let res = payload.res;
      commit('setAuth_M', {res});
    },
    async checkAuth({commit}){
      console.log("Checking auth")
      let response = await auth.checkAuth()
      let valid = response.valid

      commit('setAuth_M', {valid});
    },
    async setInfo({commit, state}){
      if(state.is_auth){
        let response = await employee.getEmployee();
        let res = response[0]
        commit('setMain_M', {res})
      }
    },
    async InitUser({dispatch}){
      await dispatch('checkAuth');
      await dispatch('setInfo');
    },
    logout({state, dispatch}){
      if(state.is_auth){
        auth.logout();
        dispatch('checkAuth');
      }
    },
    async login({state, dispatch, commit}, payload){
      if(!state.is_auth){
        let response = await auth.login(payload, null)
        if(response.status == 200){
          let payload = {text:"Succesfully logged in"}
          let valid = true;
          commit('setAuth_M', {valid});
          dispatch('setSnackbar', payload , {root:true})
          dispatch('setInfo');
          router.push('dashboard');
          return 0;
        } else{
          let payload = {text:response.err}
          dispatch('setSnackbar', payload, {root:true})
          if(response.status == 405)
            return 2
          if(response.status == 404)
            return 1
        }
      }
    },
  }

export const UserModule = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
  };
import * as types from './../mutation-types'
const services = require('../../services/employeeService');

const state = {
    employees_list : []
  }
  
  const mutations = {
    setEmployees(state, {res}){
      state.employees_list = [...res]
    },
    resetEmployees(state){
      state.employees_list = []
    },

  }
  
  const getters = {
    getEmployees: state => state.employees_list
  }
  
  const actions = {
    async loadEmployees({commit}){
      var res = await services.getAll();
      commit('setEmployees', {res})
    }
  }

export const EmployeesModule = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
  };
import * as auth from '../../services/auth'
import * as employee from '../../services/employeeService'
import router from './../../router'

const state = {
  is_auth: false,
  is_init: false,
  user: {
    avatar: 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light',
    email_address: '',
    employee_id: -1,
    first_name: '',
    last_name: '',
    store_id: -1,
    birthdate: '',
    job_level: -1,
    job: '',
    phone_number: -1,
    address: -1,
    street_num: -1,
    address_1: '',
    address_2: '',
    zip_code: -1,
    city_name: '',
    country: ''
  }
}

const mutations = {
  setMain_M (state, { res }) {
    // console.log(res)
    state.user = Object.assign(state.user, res)
    console.log('User initiated')
    state.is_init = true
  },
  setAddress_M (state, { res }) {
    console.log(res)
    state.user.address.street_num = res.street_num
    state.user.address.address_1 = res.address_1
    state.user.address.address_2 = res.address_2
    state.user.address.zip_code = res.zip_code
    state.user.address.city_name = res.city_name
    state.user.address.country = res.country
  },
  setAuth_M (state, { valid }) {
    state.is_auth = valid
  }

}

const getters = {
  getAuth: state => state.is_auth,
  isLoaded: state => state.is_init,
  getUserInfo: state => state.user,
  getAuthLvl: state => state.user.job_level
}

const actions = {
  setAuth ({ commit }, payload) {
    let res = payload.res
    commit('setAuth_M', { res })
  },
  async checkAuth ({ commit }) {
    console.log('Checking auth')
    let response = await auth.checkAuth()
    let valid = response.valid
    commit('setAuth_M', { valid })
  },
  async setInfo ({ commit, state }) {
    console.log('Setting user_info')
    if (state.is_auth) {
      let response = await employee.getEmployee()
      let res = response[0]
      commit('setMain_M', { res })
    }
  },
  async setAddress ({ commit, state }) {
    if (state.is_auth) {
      let response = await employee.getAddress(state.user.address.id)
      let res = response[0]
      commit('setAddress_M', { res })
    }
  },
  async InitUser ({ dispatch }) {
    await dispatch('checkAuth')
    await dispatch('setInfo')
    // await dispatch('setAddress');
  },
  logout ({ state, dispatch }) {
    if (state.is_auth) {
      auth.logout()
      dispatch('checkAuth')
    }
  },
  async login ({ state, dispatch, commit }, payload) {
    if (!state.is_auth) {
      let response = await auth.login(payload, null)
      if (response.status === 200) {
        let payload = { text: 'Succesfully logged in' }
        let valid = true
        commit('setAuth_M', { valid })
        dispatch('setSnackbar', payload, { root: true })
        dispatch('setInfo')
        router.push('dashboard')
        return 0
      } else {
        let payload = { text: response.err }
        dispatch('setSnackbar', payload, { root: true })
        if (response.status === 405) { return 2 }
        if (response.status === 404) { return 1 }
      }
    }
  }
}

export const UserModule = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

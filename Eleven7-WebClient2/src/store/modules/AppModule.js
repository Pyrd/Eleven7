
import { set, toggle } from '@/utils/vuex'

const state = {
  drawer: null,
  color: 'success',
  image: 'https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-2.32103624.jpg',
  sidebarBackgroundColor: 'rgba(27, 27, 27, 0.74)'
}

const mutations = {
  setDrawer: set('drawer'),
  setImage: set('image'),
  setColor: set('color'),
  toggleDrawer: toggle('drawer')
}

const getters = {
}

const actions = {

}

export const app = {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}

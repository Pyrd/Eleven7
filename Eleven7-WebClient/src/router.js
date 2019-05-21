import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Admin from './views/Admin.vue'
import Employees from './views/Employees/Employees.vue'
import AccountSettings from './views/AccountSettings.vue'
import store from './store/store'
Vue.use(Router)

let router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: { 
                guest: true
            }
        },
        { 
            path: '/register',
            name: 'register',
            component: () =>  import(/* webpackChunkName: "register" */ './views/Register.vue'),
        },
        {
          path: '/dashboard',
          name: 'home',
          component: Home,
          meta: { 
              requiresAuth: true
          }
        },
        {
            path: '/employees',
            name: 'employees',
            component: Employees,
            meta: { 
                requiresAuth: true
            },
            children: [
                {
                  path: '/:id',
                  component: () => import(/* webpackChunkName: "employeeprofile" */ './views/Employees/EmployeeProfile.vue')
                },
              ]
        },
        {
            path: '/account_settings',
            name: 'AccountSettings',
            component: () => import(/* webpackChunkName: "acc_settings" */ './views/AccountSettings.vue'),
            meta: { 
                requiresAuth: true
            }
        },
        {
            path: '/admin',
            name: 'admin',
            component: () => import(/* webpackChunkName: "admin" */ './views/Admin.vue'),
            meta: { 
                requiresAuth: true
            }
        },
    ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) { 
      if (localStorage.getItem('jwt') == null) {
          next({
              path: '/login',
              params: { nextUrl: to.fullPath }
          })
      } else {
        next()
          
      }
  } else if(to.matched.some(record => record.meta.guest)) {
      if(localStorage.getItem('jwt') == null){
          next()
      }
      else{
          next({ name: 'dashboard'})
      }
  }else {
      next() 
  }
})

export default router
// {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
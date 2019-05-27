import Vue from 'vue'
import Router from 'vue-router'
import store from './store/store'
Vue.use(Router)

function loadView(view) {
    return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)
  }

let router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: loadView('Login'),
            meta: { 
                guest: true
            }
        },
        { 
            path: '/register',
            name: 'register',
            component: loadView('Register'),
            meta: { 
                requiresAuth: true
            }
        },
        {
          path: '/',
          name: 'home',
          component: loadView('Home'),
          meta: { 
              requiresAuth: true
          }
        },
        {
            path: '/employees',
            name: 'employees',
            props: true,
            component: loadView('Employees/Employees'),
            meta: { 
                requiresAuth: true
            },
        },
        {
            path: '/employees/list',
            name: 'EmployeesList',
            component: loadView('Employees/EmployeesList'),
            meta: { 
                requiresAuth: true
            },
        },
        {
            path: '/employees/search',
            name: 'EmployeesSearch',
            component: loadView('Employees/EmployeeSearch'),
            meta: { 
                requiresAuth: true
            },
        },
        {
            path: '/employees/profile/:id',
            name: 'employee_profile',
            component: loadView('Employees/EmployeeProfile'),
            meta: { 
                requiresAuth: true
            },
        },
        {
            path: '/stores',
            name: 'stores',
            component: loadView('Stores/StoreManagement'),
            meta: { 
                requiresAuth: true
            },
        },
        {
            path: '/account_settings',
            name: 'AccountSettings',
            component: loadView('AccountSettings'),
            meta: { 
                requiresAuth: true
            }
        },
        {
            path: '/admin',
            name: 'admin',
            component: () => loadView('Admin'),
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
        //   console.log(store)
        //   if(store.getters['UserModule/isLoaded']){
        //     next()
        //   } else {
        //       console.log("not loaded")
        //   }
          next()
          
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


   
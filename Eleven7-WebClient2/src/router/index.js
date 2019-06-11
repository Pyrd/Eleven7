import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import store from '../store/index'

Vue.use(Router)
Vue.use(Meta)

function loadView (view) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)
}

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: loadView('Login'),
      meta: {
        guest: true
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: loadView('Register'),
      meta: {
        requiresAuth: true,
        AuthLevel: 3
      }
    },
    {
      path: '/',
      name: 'Dashboard',
      component: loadView('Home'),
      meta: {
        requiresAuth: true,
        AuthLevel: 1
      }
    },
    {
      path: '/employees',
      name: 'Employees Management',
      props: true,
      component: loadView('Employees/Employees'),
      meta: {
        requiresAuth: true,
        AuthLevel: 2
      }
    },
    {
      path: '/employees/list',
      name: 'Employees Management List',
      component: loadView('Employees/EmployeesList'),
      meta: {
        requiresAuth: true,
        AuthLevel: 3
      }
    },
    {
      path: '/employees/search',
      name: 'Employees Management Search',
      component: loadView('Employees/EmployeeSearch'),
      meta: {
        requiresAuth: true,
        AuthLevel: 3
      }
    },
    {
      path: '/employees/profile/:id',
      name: 'Employee Profile',
      component: loadView('Employees/EmployeeProfile'),
      meta: {
        requiresAuth: true,
        AuthLevel: 1
      }
    },
    {
      path: '/management',
      name: 'Management',
      component: loadView('Management'),
      meta: {
        requiresAuth: true,
        AuthLevel: 2
      }
    },
    {
      path: '/stores',
      name: 'Store Management',
      component: loadView('Stores/StoreManagement'),
      meta: {
        requiresAuth: true,
        AuthLevel: 2
      }
    },
    {
      path: '/stores/list',
      name: 'Store Management List',
      component: loadView('Stores/StoreList'),
      meta: {
        requiresAuth: true,
        AuthLevel: 2
      }
    },
    {
      path: '/stores/sales',
      name: 'Sales',
      component: loadView('Stores/StoreSales'),
      meta: {
        requiresAuth: true,
        AuthLevel: 2
      }
    },
    {
      path: '/stores/cart/:id',
      name: 'Cart',
      component: loadView('Stores/Cart'),
      meta: {
        requiresAuth: true,
        AuthLevel: 2
      }
    },
    {
      path: '/stores/profile/:id',
      name: 'Store Profile',
      component: loadView('Stores/storeProfile'),
      meta: {
        requiresAuth: true,
        AuthLevel: 2
      }
    },
    {
      path: '/stock',
      name: 'Stock Management',
      component: loadView('Stock/Stock'),
      meta: {
        requiresAuth: true,
        AuthLevel: 1
      }
    },
    {
      path: '/stock/inventory/:id',
      name: 'Inventory',
      component: loadView('Stock/Inventory'),
      meta: {
        requiresAuth: true,
        AuthLevel: 2
      }
    },
    {
      path: '/stock/product_catalog',
      name: 'Product Catalog',
      component: loadView('Stock/Catalog'),
      meta: {
        requiresAuth: true,
        AuthLevel: 1
      }
    },
    {
      path: '/stock/product/:id',
      name: 'Product',
      component: loadView('Stock/ProductItem'),
      meta: {
        requiresAuth: true,
        AuthLevel: 2
      }
    },
    {
      path: '/stock/product_catalog/add',
      name: 'Add Product',
      component: loadView('Stock/AddProduct'),
      meta: {
        requiresAuth: true,
        AuthLevel: 3
      }
    },
    {
      path: '/stock/supply',
      name: 'Supply',
      component: loadView('Stock/Supply'),
      meta: {
        requiresAuth: true,
        AuthLevel: 2
      }
    },
    {
      path: '/account_settings',
      name: 'Account Settings',
      component: loadView('AccountSettings'),
      meta: {
        requiresAuth: true,
        AuthLevel: 1
      }
    },
    {
      path: '/admin',
      name: 'Admin',
      component: loadView('Admin'),
      meta: {
        requiresAuth: true,
        AuthLevel: 4
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log(store.getters['UserModule/getAuthLvl'])
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('jwt') == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else if (store.getters['UserModule/getAuthLvl'] === -1) {
      store.dispatch('UserModule/InitUser').then(() => {
        if (to.matched.some(record => {
          return (record.meta.AuthLevel && record.meta.AuthLevel <= store.getters['UserModule/getAuthLvl'])
        })) {
          next()
        } else {
          next({
            path: '/'
          })
          console.log('Access Not authorized')
        }
      }
      )
    } else if (to.matched.some(record => {
      return (record.meta.AuthLevel && record.meta.AuthLevel <= store.getters['UserModule/getAuthLvl'])
    })) {
      next()
    } else {
      next({
        path: '/'
      })
      console.log('Access Not authorized')
    }
  } else {
    next()
  }
})
export default router

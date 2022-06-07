import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

import HomeView from '../views/HomeView.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Dashboard from '../views/dashboard/Dashboard.vue'
import MyAccount from '../views/dashboard/MyAccount.vue'
import Leads from '../views/dashboard/Leads.vue'
import AddLead from '../views/dashboard/AddLead.vue'
import Lead from '../views/dashboard/Lead.vue'
import EditLead from '../views/dashboard/EditLead.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      requireLogin: true,
    }
  },
  {
    path: '/dashboard/my-account',
    name: 'my-account',
    component: MyAccount,
    meta: {
      requireLogin: true,
    }
  },
  {
    path: '/dashboard/leads',
    name: 'leads',
    component: Leads,
    meta: {
      requireLogin: true,
    }
  },
  {
    path: '/dashboard/leads/add',
    name: 'add-lead',
    component: AddLead,
    meta: {
      requireLogin: true,
    }
  },
  {
    path: '/dashboard/leads/:id',
    name: 'lead',
    component: Lead,
    meta: {
      requireLogin: true,
    }
  },
  {
    path: '/dashboard/leads/:id/edit',
    name: 'edit-lead',
    component: EditLead,
    meta: {
      requireLogin: true,
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router

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
import AddTeam from '../views/dashboard/AddTeam.vue'
import Team from '../views/dashboard/Team.vue'
import AddMember from '../views/dashboard/AddMember.vue'
import Clients from '../views/dashboard/Clients.vue'
import AddClient from '../views/dashboard/AddClient.vue'
import Client from '../views/dashboard/Client.vue'
import EditClient from '../views/dashboard/EditClient.vue'
import AddNote from '../views/dashboard/AddNote.vue'
import EditNote from '../views/dashboard/EditNote.vue'
import EditMember from '../views/dashboard/EditMember.vue'

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
    path: '/dashboard/edit-member/:id',
    name: 'edit-member',
    component: EditMember,
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
    path: '/dashboard/add-team',
    name: 'add-team',
    component: AddTeam,
    meta: {
      requireLogin: true,
    }
  },
  {
    path: '/dashboard/team',
    name: 'team',
    component: Team,
    meta: {
      requireLogin: true,
    }
  },
  {
    path: '/dashboard/team/add-member',
    name: 'add-member',
    component: AddMember,
    meta: {
      requireLogin: true,
    }
  },
  {
    path: '/dashboard/clients',
    name: 'clients',
    component: Clients,
    meta: {
      requireLogin: true,
    }
  },
  {
    path: '/dashboard/clients/add',
    name: 'add-client',
    component: AddClient,
    meta: {
      requireLogin: true,
    }
  },
  {
    path: '/dashboard/clients/:id',
    name: 'client',
    component: Client,
    meta: {
      requireLogin: true,
    }
  },
  {
    path: '/dashboard/clients/:id/edit',
    name: 'edit-client',
    component: EditClient,
    meta: {
      requireLogin: true,
    }
  },
  {
    path: '/dashboard/clients/:id/add-note',
    name: 'add-note',
    component: AddNote,
    meta: {
      requireLogin: true,
    }
  },
  {
    path: '/dashboard/clients/:id/edit-note/:note_id',
    name: 'edit-note',
    component: EditNote,
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

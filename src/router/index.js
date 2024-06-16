import { createRouter, createWebHashHistory } from 'vue-router'
import store from '../store/store'

import DashboardView from '../views/DashboardView.vue'
import LessonsView from '../views/LessonsView.vue'
import StoriesView from '../views/StoriesView.vue'
import LoginView from '../views/LoginView.vue'
import SettingsView from '../views/SettingsView.vue'
import MediaView from '../views/MediaView.vue'
import UsersView from '../views/UsersView.vue'

const routes = [
  {
    path: '/',
    name: 'DashboardView',
    component: DashboardView
  },
  {
    path: '/lessons',
    name: 'LessonsView',
    component: LessonsView
  },
  {
    path: '/stories',
    name: 'StoriesView',
    component: StoriesView
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/settings',
    name: 'SettingsView',
    component: SettingsView
  },
  {
    path: '/media',
    name: 'MediaView',
    component: MediaView
  },
  {
    path: '/users',
    name: 'UsersView',
    component: UsersView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// Navigation guard to check authentication before each route navigation
// router.beforeEach((to, from, next) => {
//   // Check if the route requires authentication
//   if (to.name !== 'LoginView' && !store.state.existToken) {
//     // Redirect to login if not authenticated
//     next('/login')
//   } else {
//     // Proceed to the route
//     next()
//   }
// })

router.beforeEach(async(to, from, next) => {
  // console.log('Before each guard triggered:', to.name, from.name);
  if(to.name !== 'LoginView' && !store.state.existToken){
    next('/login')
  }else if(store.state.existToken && store.state.isExpired){
    try{
      await store.dispatch('refresh')
      next()
    } catch(error){
      store.dispatch('logout');
    }
  }else{
    next();
  }
})

export default router

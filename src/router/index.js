import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import(/* webpackChunkName: "about" */ '../views/Main.vue')
  },
  {
    path: '/mybooks',
    name: 'My Books',
    component: () => import(/* webpackChunkName: "about" */ '../views/Mybooks.vue')
  },
  {
    path: '/wishlist',
    name: 'Wish List',
    component: () => import(/* webpackChunkName: "about" */ '../views/Wishlist.vue')
  },
  {
    path: '/genres',
    name: 'Genres',
    component: () => import(/* webpackChunkName: "about" */ '../views/Genres.vue')
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import(/* webpackChunkName: "about" */ '../views/Account.vue')
  },
  {
    path: '/access',
    name: 'Access',
    component: () => import(/* webpackChunkName: "about" */ '../views/Access.vue')
  },
  {
    path: '/bestsellers',
    name: 'Best Sellers',
    component: () => import(/* webpackChunkName: "about" */ '../views/BestSellers.vue')
  },
  {
    path: '/changelog',
    name: 'Changelog',
    component: () => import(/* webpackChunkName: "about" */ '../views/Changelog.vue')
  },
  {
    path: '/alreadyread',
    name: 'Already read',
    component: () => import(/* webpackChunkName: "about" */ '../views/AlreadyRead.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

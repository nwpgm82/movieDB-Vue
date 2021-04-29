import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import allMovie from '../views/allMovie.vue'
import cat from '../views/category.vue'
import upcoming from '../views/upcoming.vue'
import nowplaying from '../views/nowplaying.vue'
import detail from '../views/detail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/all',
    name: 'allMovie',
    component: allMovie
  },
  {
    path: '/category/:cate',
    name: 'category',
    component: cat
  },
  {
    path: '/upcoming',
    name: 'upcoming',
    component: upcoming
  },
  {
    path: '/nowplaying',
    name: 'nowplaying',
    component: nowplaying
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: detail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

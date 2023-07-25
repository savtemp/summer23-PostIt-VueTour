import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard } from '@bcwdev/auth0provider-client'
import { authSettled } from '@bcwdev/auth0provider-client'
// import { authSettled } from '@bcwdev/auth0provider-client/dist/index.js'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage')
  },
  {
    path: '/about',
    name: 'About',
    component: loadPage('AboutPage')
  },
  {
    path: '/albums/:albumId',
    name: 'Album',
    component: loadPage('AlbumDetailsPage'),
    beforeEnter: authSettled
    // NOTE: authSettled says try to validate/authenticate a user if they are logged in before loading the page
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
    // NOTE: authGuard says you MUST be logged in in order to load the page
  }
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})

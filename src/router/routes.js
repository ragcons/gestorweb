
const routes = [


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/',
    component: () => import('layouts/LoginView.vue')
  },

  {
    path: '/home',
    component: () => import('pages/HomeView.vue')
  }
]

export default routes

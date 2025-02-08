import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/loja',
      name: 'loja',
      component: () => import('../views/Loja.vue')
    },
    {
      path: '/admin',
      name: 'administrador',
      component: () => import('../views/Admin.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/fornecedores',
      name: 'fornecedores',
      component: () => import('../views/Fornecedores.vue')
    },
    {
      path: '/produtos',
      name: 'produtos',
      component: () => import('../views/Produtos.vue')
    }

  ]
});


export default router


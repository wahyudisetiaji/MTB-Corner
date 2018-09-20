import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Article from './views/Article.vue'
import Join from './views/Join.vue'
import AllArticle from '@/components/article/AllArticle.vue'
import MyArticle from '@/components/article/MyArticle.vue'
import DetailArticle from '@/components/article/DetailArticle.vue'
import FormCreate from '@/components/article/FormCreate.vue'
import FormUpdate from '@/components/article/FormUpdate.vue'
import FormRegister from '@/components/join/FormRegister.vue'
import FormLogin from '@/components/join/FormLogin.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/article',
      name: 'article',
      component: Article,
      children: [
        {
          path: '/article',
          name: 'allarticle',
          component: AllArticle
        },
        {
          path: '/article/create',
          name: 'create',
          component: FormCreate
        },
        {
          path: '/article/update/:id',
          name: 'update',
          component: FormUpdate
        },
        {
          path: '/article/myarticle',
          name: 'myarticle',
          component: MyArticle
        },
        {
          path: '/article/detail/:id',
          name: 'detail',
          component: DetailArticle
        }
      ]
    },
    {
      path: '/join',
      name: 'join',
      component: Join,
      children: [
        {
          path: '/join',
          name: 'register',
          component: FormRegister
        },
        {
          path: '/join/login',
          name: 'login',
          component: FormLogin
        }
      ]
    }
  ]
})

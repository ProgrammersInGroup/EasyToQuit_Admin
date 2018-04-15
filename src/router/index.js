import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index'
import UserList from '@/page/UserList'
import Home from '@/page/home'
import Login from '@/page/login'
import Daily from '@/page/daily'
import contentList from '@/page/contentList'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Login,
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/home',
      component: Index,
      children:[{
        path: '/home',
        component: Home,
        meta: [],
      }, {
          path:'/UserList',
          component:UserList,
          meta: ['病患管理', '病患列表'],
        },{
          path:'/daily',
          component:Daily,
          meta: ['文章管理', '新增文章'],
        },{
	        path:'/contentList',
	        component:contentList,
	        meta: ['文章管理', '文章列表']
	      }]
    },
  ]
})


import VueRouter from 'vue-router'
import Layout from '@/layout/index'
import Vue from 'vue'
Vue.use(VueRouter)
// 默认的固定路由,适用于桌面应用
export const constantRoutes = [
  {
    path: '/',
    name: 'homepage',
    component: Layout,
    // component: '@/layout/index',
    redirect: 'index',
    hidden: false,
    children:[
      { 
        path: 'index',
        name: 'index',
        component: () => import('@/views/dashboard/index'),
        hidden: false
      },
      {
        path: 'hello',
        name: 'hello',
        component: () => import('@/components/HelloWorld'),
        hidden: false
      }
    ]
  }
 
]

const router =new VueRouter({
  linkActiveClass:'selected',
  routes: constantRoutes
})

export default router

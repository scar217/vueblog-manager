import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login";
import Layout from "@/views/layout/Index"
import Home from "@/views/home/Home";
import Blogs from "@/views/blog/Blogs";
import Users from "@/views/user/Users";
import Notice from "@/views/notice/Notice";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Login,
  },
  {
    path: '/index',
    component: Layout,
    children:[
      {
        path:'/index/home',
        name:'home',
        component:Home
      },
      {
        path: '/index/blogs',
        name:'blog',
        component: Blogs
      },
      {
        path:'/index/users',
        name:'user',
        component: Users
      },
      {
        path:'/index/notices',
        name:'notice',
        component: Notice
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Resign from '@/components/Resign'
import Blogs from '@/views/backend/Blogs'
import AddBlog from '@/views/backend/AddBlog'
import LeaveMessage from '@/views/backend/LeaveMessage'
import ManageBlog from '@/views/backend/ManageBlog'
import SingleBlog from '@/views/backend/SingleBlog'
import EditBlog from '@/views/backend/EditBlog'
import Layout from '@/views/Layout'
// import Test from '@/views/test'
import store from '@/store/index'

Vue.use(Router)

let router =  new Router({
  mode: 'history',
  linkActiveClass: 'is-active',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/management',
      name: 'Management',
      component: Layout,
      children:[
        {
          path: '/blogs',
          name: 'Blogs',
          component: Blogs,
          meta:{
            login: false,
            index: 0
          }
        },
        {
          path: '/addblog',
          name: 'AddBlog',
          component: AddBlog,
          meta:{
            login: true,
            index: 1
          }
        },
        {
          path: '/messages',
          name: 'LeaveMessage',
          component: LeaveMessage,
          meta:{
            login: false,
            index: 3
          }
        },
        {
          path: '/manage',
          name: 'ManageBlog',
          component: ManageBlog,
          meta:{
            login: true,
            index: 2
          }
        },
        {
          path: '/edit/:id',
          name: 'EditBlog',
          component: EditBlog,
          meta:{
            login:true
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/resign',
      name: 'Resign',
      component: Resign
    },
    {
      path: '/single/:id',
      name: 'SingleBlog',
      component: SingleBlog
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
router.beforeEach((to,from,next)=>{
  if(to.matched.some((item)=>item.meta.login)){
    let isLogin = store.state.isLogin
    if(isLogin){
      next()
    }else{
      router.push({
        path:"/login",
        query:{
          redirect:to.path.slice(1)
        }
      })
    }
  }else{
    next()
  }
})

export default router

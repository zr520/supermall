import Vue from 'vue'
import  VueRouter from 'vue-router'

const Home = ()=> import('views/home/Home')
const Category = ()=> import('views/category/Category')
const Cart = ()=> import('views/cart/Cart')
const Profile = ()=> import('views/profile/Profile')

//1.安装插件
Vue.use(VueRouter)

const routes =[
    {
        path:'',
        redirect:'/home'
    },
    {
        path:'/home',
        component:Home
    },
    {
        path:'/category',
        component:Category
    },
    {
        path:'/shopcart',
        component:Cart
    },
    {
        path:'/profile',
        component:Profile
    },
]

//2.创建VueRouter
const  router = new VueRouter({
    routes,
    //两种模式，一种history另一种是hash，其中hash域名中有#号
    mode:'history'
})

export default router
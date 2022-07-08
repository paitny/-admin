import {createRouter,createWebHashHistory} from "vue-router";
import axios from "axios";
import {ElMessage} from 'element-plus'
const login=()=>import("../views/LoginAdmin.vue");
const home=()=>import("../views/HomeAdmin.vue");
const userManager=()=>import("../views/User/UserManager.vue");
const articleAdd=() => import('../views/ArticleManage/ArticleAdd.vue');
const articleManager=() => import('../views/ArticleManage/ArticleManager.vue');
const linkAdd=() => import('../views/LinkManage/LinkAdd.vue');
const linkManager=() => import('../views/LinkManage/LinkManager.vue');
const contactMsg=() => import('../views/ContactMessage/ContactMsg.vue');
const swiperAdd=() => import('../views/SwiperManage/SwiperAdd.vue');
const swiperManager=() => import('../views/SwiperManage/SwiperManager.vue');
const videoAdd=() => import('../views/VideoManage/VideoAdd.vue');
const videoManager=() => import('../views/VideoManage/VideoManager.vue');
const latelyVisitor=()=>import('../views/User/LatelyVisitor.vue')
const musicAdd=()=>import('../views/Music/MusicAdd.vue');
const musicManager=()=>import('../views/Music/MusicManager.vue')
const routes=[
    {
        path:"/",
        name:"/",
        redirect:"/login",
    },
    {
        path: "/login",
        name:"Login",
        component:login,
    },
    {
        path:"/home",
        name:"Home",
        component:home,
        redirect:"/articleManager",
        meta: { title:"首页"},
        children:[
            {
                path:"/userManager",
                name:"UserManager",
                component:userManager,
                meta: { title:"用户管理"},
            },
            {
                path:"/latelyVisitor",
                name:"LatelyVisitor",
                component:latelyVisitor,
                meta: { title:"最近访客"},
            },

            {

                path: "/articleAdd",
                name: "ArticleAdd",
                component: articleAdd,
                meta: { title:'文章添加'},
            },
            {
                path: "/articleManager",
                name: "ArticleManager",
                component:articleManager ,
                meta: { title:'文章管理'},
            },
            {

                path: "/linkAdd",
                name: "LinkAdd",
                component: linkAdd,
                meta: { title:'友链添加'},
            },
            {
                path: "/linkManager",
                name: "LinkManager",
                component:linkManager ,
                meta: { title:'友链管理'},
            },



            {
                path: "/contactMsg",
                name: "ContactMsg",
                component:contactMsg ,
                meta: { title:'反馈中心'},
            },

            {
                path: "/swiperAdd",
                name: "SwiperAdd",
                component:swiperAdd ,
                meta: { title:'轮播图添加'},
            },
            {
                path: "/swiperManager",
                name: "SwiperManager",
                component:swiperManager ,
                meta: { title:'轮播图管理'},
            },


            {
                path: "/videoAdd",
                name: "VideoAdd",
                component:videoAdd ,
                meta: { title:'视频添加'},
            },
            {
                path: "/videoManager",
                name: "VideoManager",
                component:videoManager ,
                meta: { title:'视频管理'},
            },
            {
                path:"/musicAdd",
                name:"MusicAdd",
                component:musicAdd,
                meta: { title:"音乐添加"},
            },
            {
                path:"/musicManager",
                name:"MusicManager",
                component:musicManager,
                meta: { title:"音乐管理"},
            },
        ]

    },

]


 const router = createRouter({
    history: createWebHashHistory(),
    routes:routes,

})

router.beforeEach(async (to, from) => {
    let {data}=await axios({
        method:'POST',
        url:"/adminServer/check"
    })
    if (

        // 检查用户是否已登录
        to.name == 'Login'&& !data.code
    ) {
        ElMessage.error("您已登录,禁止返回登录页")
        return { name: 'Home' }
    }
})

export default router

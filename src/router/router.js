import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

// const Foo = () => import(/* webpackChunkName: "login" */ '../views/login.vue');
const login = r => require.ensure([], () => r(require('../views/login/login.vue')), 'login');//登录页
const register = r => require.ensure([], () => r(require('../views/register/register.vue')), 'register');//注册页
const registerSuccess = r => require.ensure([], () => r(require('../views/register/registerSuccess.vue')), 'registerSuccess');//注册成功页
const layout = r => require.ensure([], () => r(require('../views/layout/layout.vue')), 'layout');//模板页

const ad = r => require.ensure([], () => r(require('../views/ad/ad.vue')), 'ad');//广告数据页
const finance = r => require.ensure([], () => r(require('../views/finance/finance.vue')), 'finance');//财务数据页
const account = r => require.ensure([], () => r(require('../views/account/account.vue')), 'account');//账户页
const adadmin = r => require.ensure([], () => r(require('../views/adadmin/adadmin.vue')), 'adadmin');//账户页
const childaccount = r => require.ensure([], () => r(require('../views/childaccount/childaccount.vue')), 'childaccount');//账户页


export const routes = [
    {//登录页
        path: '/login',
        component: login
    },
    {//注册页
        path: '/register',
        component: register
    },
    {//注册成功页
        path: '/registerSuccess',
        component: registerSuccess
    },
    {//布局框架
        path: '/layout',
        component: layout,
        children:[
            {//广告数据页
                path: 'ad',
                component: ad
            },
            {//财务数据页
                path: 'finance',
                component: finance
            },
            {//广告管理页
                path: 'adadmin',
                component: adadmin
            },
            {//子账号页
                path: 'childaccount',
                component: childaccount
            },
            {//账户页
                path: 'account',
                component: account
            },
        ]
    },
    {path:'*',redirect:'/login'}
];

export default new Router({
    routes: routes
});

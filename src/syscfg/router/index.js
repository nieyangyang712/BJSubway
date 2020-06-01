import Vue from 'vue';
import Router from 'vue-router';
const _import = require('./_import_' + process.env.NODE_ENV);
import main from '../containers/main'

/* login */
// const Login = _import('login/index');
// Vue.use(Router);
// export const constantRouterMap = [{
//     path: '/login',
//     component: Login,
//     hidden: true
//   },
//   {
//     path: '/pages',
//     redirect: '/pages/p404',
//     name: 'Pages',
//     component: {
//       render(c) {
//         return c('router-view')
//       }
//       // main,
//     },
//     children: [{
//         path: '404',
//         name: 'Page404',
//         component: _import('errorPages/Page404')
//       },
//       {
//         path: '500',
//         name: 'Page500',
//         component: _import('errorPages/Page404')
//       },
//     ]
//   }
// ]
// export default new Router({
//   mode: 'history',
//   linkActiveClass: 'open active',
//   scrollBehavior: () => ({
//     y: 0
//   }),
//   routes: constantRouterMap
// });


export const asyncRouterMapUser = [

  {
    path: '/',
    redirect: '/user',
    name: '首页',
    component: main,
    hidden: false,
    children: [{
      path: '/user',
      name: '用户信息',
      icon: 'ios-film',
      component: _import('user')
    }]
  },

  {
    path: '/subarea',
    redirect: '/subarea',
    name: '首页',
    component: main,
    hidden: false,
    children: [{
      path: '/subarea',
      name: '分区信息',
      icon: 'ios-film',
      component: _import('subarea')
    }, ]
  },
  {
    path: '*',
    redirect: '/pages/404',
    hidden: true
  }

];
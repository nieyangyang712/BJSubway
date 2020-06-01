import Vue from 'vue';
import Router from 'vue-router';
const _import = require('./_import_' + process.env.NODE_ENV);
import main from '@/containers/main'


/* login */
const Login = _import('login/index');
Vue.use(Router);

export const constantRouterMap = [{
    path: '/login',
    component: Login,
    hidden: true
  },
  {
    path: '/pages',
    redirect: '/pages/p404',
    name: 'Pages',
    component: {
      render(c) {
        return c('router-view')
      }
      // main,
    },
    children: [{
        path: '404',
        name: 'Page404',
        component: _import('errorPages/Page404')
      },
      {
        path: '500',
        name: 'Page500',
        component: _import('errorPages/Page404')
      },
    ]
  }
]

export default new Router({
  mode: 'history',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
});

export const asyncRouterMap = [

  {
    path: '/',
    redirect: '/index',
    name: '首页',
    component: main,
    hidden: false,
    children: [{
      path: '/index',
      name: '首页',
      icon: 'ios-index',
      component: _import('index')
    }, ]
  },
  {
    path: '/train',
    redirect: '/train',
    name: '首页',
    component: main,
    hidden: false,
    children: [{
      path: '/train',
      name: '地铁线路',
      icon: 'briefcase',
      component: _import('train')
    }, ]
  },
  {
    path: '/facility',
    redirect: '/facility',
    name: '首页',
    component: main,
    hidden: false,
    children: [{
      path: '/facility',
      name: '设备',
      icon: 'briefcase',
      component: _import('facility')
    }, ]
  },
  {
    path: '*',
    redirect: '/pages/404',
    hidden: true
  }

];
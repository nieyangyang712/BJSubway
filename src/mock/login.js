import { param2Obj } from 'utils';

const userMap = {
  admin: {
    role: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    name: 'Admin',
    uid: '001',
    userType:'1'
  },
  editor: {
    role: ['editor'],
    token: 'editor',
    introduction: '我是编辑',
    name: '编辑师',
    uid: '002',
    userType:'2'
  },
  developer: {
    role: ['developer'],
    token: 'developer',
    introduction: '我是开发',
    name: '工程师小王',
    uid: '003',
    userType:'3'
  },
  design: {
    role: ['design'],
    token: 'design',
    introduction: '我是设计',
    name: '设计部小张',
    uid: '004',
    userType:'4'
  }
}

export default {
  loginByEmail: config => {
    const { email } = JSON.parse(config.body);
      return userMap[email.split('@')[0]];
  },
  getInfo: config => {
    const { token } = param2Obj(config.url);
    if (userMap[token]) {
      return userMap[token];
    } else {
      return Promise.reject('a');
    }
  },
  logout: () => 'success'
};

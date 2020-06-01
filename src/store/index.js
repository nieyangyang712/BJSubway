import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import app from './modules/app';
import user from './modules/user';
import permission from './modules/permission';
import parameter from './modules/parameter';
import getters from './getters';


Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    parameter
  },
  getters,
  plugins:[createPersistedState({
    storage: window.sessionStorage,
    reducer(val){
      return {
        parameter: val.parameter
      }
    }
  })]
});
store.dispatch('getData')
console.log(store)
export default store

import Vue from 'vue';
import App from './App.vue';
import SimpleBank2 from './SimpleBank2.vue'
import PoolRecorder from "./PoolRecorder.vue";
import Vuex from 'vuex';
import VueRouter from 'vue-router';

import drizzleVuePlugin from '@drizzle/vue-plugin';
import drizzleOptions from './drizzleOptions';
Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: PoolRecorder },
    { path: '/simplebank', component: SimpleBank2 },
  ]
});
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    count: 0,
    addressSimpleBank: 0
  },
  mutations: {
    increment(state) {
      state.count++
    },
    updateAddress(state, address) {
      state.addressSimpleBank = address
    }
  }
})

Vue.use(drizzleVuePlugin, { store, drizzleOptions });

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');

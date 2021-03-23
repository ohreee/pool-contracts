import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex';
import router from './router'
import drizzleVuePlugin from '@drizzle/vue-plugin';
import drizzleOptions from './drizzleOptions';
Vue.config.productionTip = false
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

new Vue({
  store,
    router,
    render: h => h(App),
}).$mount('#app');
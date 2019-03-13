import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import ContactList from './components/ContactList.vue';
import CreateContact from './components/CreateContact.vue';

Vue.use(VueRouter);

Vue.config.productionTip = false;

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: ContactList },
    { path: '/create', component: CreateContact }
  ]
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');

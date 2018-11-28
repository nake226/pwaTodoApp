// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false

let app;
// Initialize Firebase
var config = {
  apiKey: "AIzaSyDg3ly7grG-pi_TTpssMyo64XMhyvb_Ww8",
  authDomain: "pwa-todo-app-9c356.firebaseapp.com",
  databaseURL: "https://pwa-todo-app-9c356.firebaseio.com",
  projectId: "pwa-todo-app-9c356",
  storageBucket: "pwa-todo-app-9c356.appspot.com",
  messagingSenderId: "1324883851"
};
firebase.initializeApp(config);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

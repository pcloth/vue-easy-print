// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import  VueComponent  from '../src'
import app from './app.vue'

Vue.config.productionTip = false

new Vue({
    el: '#app',
    template: '<app/>',
    render: h => h(app),
})
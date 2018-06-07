import vueEasyPrint from './src/index.vue';

vueEasyPrint.install = function(Vue) {
  Vue.component(vueEasyPrint.name, vueEasyPrint);
};

export default vueEasyPrint;
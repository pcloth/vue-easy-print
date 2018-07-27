import VueComponent from './lib/vue-easy-print.vue'
export function install(Vue) {
  Vue.component(VueComponent.name, VueComponent)
  /* -- Add more components here -- */
}
export default VueComponent


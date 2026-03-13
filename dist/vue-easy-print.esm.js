import bundle from './vue-easy-print.umd.js'

const VueEasyPrint = bundle && bundle.default ? bundle.default : bundle

if (bundle && bundle.install && !VueEasyPrint.install) {
  VueEasyPrint.install = bundle.install
}

export const install = VueEasyPrint.install
export default VueEasyPrint

<template>
    <div>
        <iframe class="easy-print-no-display" ref="easyPrintIframe" id="easyPrintIframe" :srcdoc="textContent" src="" frameborder="0">
            <h5>您的浏览器不支持iframe</h5>
        </iframe>
        <div v-show="tableShow" ref="template">
            <slot :getChineseNumber="getChineseNumber"  >
                <demo :tableData="tableData" :onePageRow="onePageRow" :getChineseNumber="getChineseNumber"></demo>
            </slot>
         
        </div>
        <div class="easy-print-no-display">
            <!-- 测试的时候取消easy-print-no-display的class名字。 -->
            <!-- 这里按钮偷了个懒，直接拿了element-ui的css name来用。 -->
            <button @click="print" type="button" class="el-button el-button--default">
                <span>开始打印</span>
            </button>
        </div>
    </div>
</template>

<script>
import demo from './template/demo'

export default {
    name:'vue-easy-print',
    components: {
        // 配置打印模版组件，需要将你写的打印模版全部加载进来
        demo,
    },
    props: {
        // 本次引用组件需要打印的模版
        // 也就是说，引用时只需要 <easyPrint printTemplate="demo"></easyPrint>
        // 就可以直接加载template目录下的demo.vue组件来打印了。
        printTemplate: {
            type: String,
            default: 'demo'
        },

        // 针对分页表格模式：末尾空白行插入
        spaceRow: {
            type:Boolean,
            default:false,
        },

        // 针对分页表格模式：传入的打印数据。
        tableData:{
            type:Object,
            default() {
                return undefined
            }
        },
        // 是否显示表格
        tableShow:{
            type:Boolean,
            default:false
        },
        // 每页多少行
        onePageRow: {
            type:Number,
            default:5,
        },

        beforeCopy:Function,
        beforePrint:Function,

    },
    data() {
        return {
            textContent: '<span>正在初始化打印组件...</span>'
        }
    },

    methods: {
        print() {

            // 复制head，主要是css部分
            this.$refs.easyPrintIframe.contentDocument.head.innerHTML = window.document.head.innerHTML

            if(typeof this.beforeCopy==='function'){
                // 检测到有复制前需要执行的功能
                this.beforeCopy()
            }

            // 复制body，打印内容
            this.$refs.easyPrintIframe.contentDocument.body.innerHTML = this.$refs.template.innerHTML

            if(typeof this.beforePrint==='function'){
                // 检测到有打印前需要执行的功能
                this.beforePrint()
            }

            // 打印开始
            this.$refs.easyPrintIframe.contentWindow.print()
          

            
        },
     
        getChineseNumber(currencyDigits) {
            // 转换数字到中文大写，请用prop传递给模版组件，这个函数在网上扣的。
            var MAXIMUM_NUMBER = 99999999999.99 
            // Predefine the radix characters and currency symbols for output: 
            var CN_ZERO = '零'
            var CN_ONE = '壹'
            var CN_TWO = '贰'
            var CN_THREE = '叁'
            var CN_FOUR = '肆'
            var CN_FIVE = '伍'
            var CN_SIX = '陆'
            var CN_SEVEN = '柒'
            var CN_EIGHT = '捌'
            var CN_NINE = '玖'
            var CN_TEN = '拾'
            var CN_HUNDRED = '佰'
            var CN_THOUSAND = '仟'
            var CN_TEN_THOUSAND = '万'
            var CN_HUNDRED_MILLION = '亿'
            var CN_SYMBOL = ''; // 可以设置前缀 比如 人民币
            var CN_DOLLAR = '元'
            var CN_TEN_CENT = '角'
            var CN_CENT = '分'
            var CN_INTEGER = '整'

            // Variables: 
            var integral; // Represent integral part of digit number. 
            var decimal; // Represent decimal part of digit number. 
            var outputCharacters; // The output result. 
            var parts
            var digits, radices, bigRadices, decimals
            var zeroCount
            var i, p, d
            var quotient, modulus

            // Validate input string: 
            if(currencyDigits===undefined){
                return ''
            }
            currencyDigits = currencyDigits.toString()
            if (currencyDigits == '') {
                // alert("Empty input!"); 
                return ''
            }
            if (currencyDigits.match(/[^,.\d]/) != null) {
                // alert("Invalid characters in the input string!"); 
                return ''
            }
            if ((currencyDigits).match(/^((\d{1,3}(,\d{3})*(.((\d{3},)*\d{1,3}))?)|(\d+(.\d+)?))$/) == null) {
                // alert("Illegal format of digit number!"); 
                return ''
            }

            // Normalize the format of input digits: 
            currencyDigits = currencyDigits.replace(/,/g, ''); // Remove comma delimiters. 
            currencyDigits = currencyDigits.replace(/^0+/, ''); // Trim zeros at the beginning. 
            // Assert the number is not greater than the maximum number. 
            if (Number(currencyDigits) > MAXIMUM_NUMBER) {
                alert('您输入的金额太大，请重新输入!')
                return ''
            }

            // Process the coversion from currency digits to characters: 
            // Separate integral and decimal parts before processing coversion: 
            parts = currencyDigits.split('.')
            if (parts.length > 1) {
                integral = parts[0]
                decimal = parts[1]
                // Cut down redundant decimal digits that are after the second. 
                decimal = decimal.substr(0, 2)
            } else {
                integral = parts[0]
                decimal = ''
            }
            // Prepare the characters corresponding to the digits: 
            digits = new Array(CN_ZERO, CN_ONE, CN_TWO, CN_THREE, CN_FOUR, CN_FIVE, CN_SIX, CN_SEVEN, CN_EIGHT, CN_NINE)
            radices = new Array('', CN_TEN, CN_HUNDRED, CN_THOUSAND)
            bigRadices = new Array('', CN_TEN_THOUSAND, CN_HUNDRED_MILLION)
            decimals = new Array(CN_TEN_CENT, CN_CENT)
            // Start processing: 
            outputCharacters = ''
            // Process integral part if it is larger than 0: 
            if (Number(integral) > 0) {
                zeroCount = 0
                for (i = 0; i < integral.length; i++) {
                    p = integral.length - i - 1
                    d = integral.substr(i, 1)
                    quotient = p / 4
                    modulus = p % 4
                    if (d == '0') {
                        zeroCount++
                    } else {
                        if (zeroCount > 0) {
                            outputCharacters += digits[0]
                        }
                        zeroCount = 0
                        outputCharacters += digits[Number(d)] + radices[modulus]
                    }
                    if (modulus == 0 && zeroCount < 4) {
                        outputCharacters += bigRadices[quotient]
                    }
                }
                outputCharacters += CN_DOLLAR
            }
            // Process decimal part if there is: 
            if (decimal != '') {
                for (i = 0; i < decimal.length; i++) {
                    d = decimal.substr(i, 1)
                    if (d != '0') {
                        outputCharacters += digits[Number(d)] + decimals[i]
                    }
                }
            }
            // Confirm and return the final output string: 
            if (outputCharacters == '') {
                outputCharacters = CN_ZERO + CN_DOLLAR
            }
            if (decimal == '') {
                outputCharacters += CN_INTEGER
            }
            outputCharacters = CN_SYMBOL + outputCharacters
            return outputCharacters
        }
    },

}
</script>

<style scoped>
.easy-print-no-display {
    /* 调试模式下屏蔽css即可 */
    width: 0;
    height: 0;
    top: -100%;
    left: -100%;
    position: fixed;
    z-index: 0;
}
</style>
<template>
    <div>
        <div v-show="tableShow" ref="template">
            <slot :getChineseNumber="getChineseNumber">
                <span>编写你自己的打印区域组件，然后slot插入到vue-easy-print</span>
            </slot>
        </div>
        <!-- 这里按钮偷了个懒，直接拿了element-ui的css name来用。 -->
        <button v-if="buttonShow" @click="print" type="button" :class="buttonClass">
            <span>开始打印</span>
        </button>
    </div>
</template>

<script>
export default {
    name: "vue-easy-print",
    components: {},
    props: {
        // 针对分页表格模式：末尾空白行插入
        spaceRow: {
            type: Boolean,
            default: false
        },

        // 针对分页表格模式：传入的打印数据。
        tableData: {
            type: Object,
            default() {
                return undefined;
            }
        },
        // 是否显示表格
        tableShow: {
            type: Boolean,
            default: false
        },
        // 是否显示默认的打印按钮
        buttonShow: {
            type: Boolean,
            default: false
        },
        buttonClass: {
            type: String,
            default: "el-button el-button--default"
        },
        // 每页多少行
        onePageRow: {
            type: Number,
            default: 5
        },

        beforeCopy: Function,
        beforePrint: Function
    },
    data() {
        return {
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            let printI = document.getElementById("easyPrintIframe");
            if (!printI) {
                printI = document.createElement("iframe");
                printI.id = "easyPrintIframe";
                printI.style.position = 'fixed'
                printI.style.width = '0'
                printI.style.height = '0'
                printI.style.top = '-100px'

                // 兼容ie
                if (
                    window.location.hostname !== document.domain &&
                    navigator.userAgent.match(/msie/i)
                ) {
                    
                    printI.src =
                        'javascript:document.write("<head><script>document.domain=\\"' +
                        document.domain +
                        '\\";</s' +
                        'cript></head><body></body>")';
                   
                }
                printI.onload = () => {
                    this.getStyle();
                }
                 
                document.body.appendChild(printI);
            }else{
                this.getStyle();
            } 
        },
        print() {
            if (typeof this.beforeCopy === "function") {
                // 检测到有复制前需要执行的功能
                this.beforeCopy();
            }

            let $iframe = document.getElementById("easyPrintIframe");
            // 复制body，打印内容
            $iframe.contentDocument.body.innerHTML = this.$refs.template.innerHTML;

            if (typeof this.beforePrint === "function") {
                // 检测到有打印前需要执行的功能
                // 比如有些二维码组件无法直接复制dom完成。
                this.beforePrint();
            }
            
            // 执行打印
            this.$nextTick(() => { 
                setTimeout(() => {
                    $iframe.contentWindow.print();
                }, 100);
             })
        },
        getStyle() {
            let printI = document.getElementById("easyPrintIframe");
            var str = "",
                styles1 = document.querySelectorAll("style");
            for (var i = 0; i < styles1.length; i++) {
                str += styles1[i].outerHTML;
            }

            printI.contentDocument.head.innerHTML = str;
            // 添加link引入
            let styles = document.querySelectorAll("link");
            for (let i = 0; i < styles.length; i++) {
                // chrome 正常，firefox不正常，能执行到，但是添加没结果
                let link = document.createElement("link");
                link.setAttribute("rel", "stylesheet");
                if(styles[i].type) link.setAttribute("type", styles[i].type);
                else link.setAttribute("type", 'text/css');
                link.setAttribute("href", styles[i].href);
                link.setAttribute('media','all');
                printI.contentDocument.head.appendChild(link);
            }
            
        },
        getChineseNumber(currencyDigits) {
            // 转换数字到中文大写，请用prop传递给模版组件，这个函数在网上扣的。
            var MAXIMUM_NUMBER = 99999999999.99;
            // Predefine the radix characters and currency symbols for output:
            var CN_ZERO = "零";
            var CN_ONE = "壹";
            var CN_TWO = "贰";
            var CN_THREE = "叁";
            var CN_FOUR = "肆";
            var CN_FIVE = "伍";
            var CN_SIX = "陆";
            var CN_SEVEN = "柒";
            var CN_EIGHT = "捌";
            var CN_NINE = "玖";
            var CN_TEN = "拾";
            var CN_HUNDRED = "佰";
            var CN_THOUSAND = "仟";
            var CN_TEN_THOUSAND = "万";
            var CN_HUNDRED_MILLION = "亿";
            var CN_SYMBOL = ""; // 可以设置前缀 比如 人民币
            var CN_DOLLAR = "元";
            var CN_TEN_CENT = "角";
            var CN_CENT = "分";
            var CN_INTEGER = "整";

            // Variables:
            var integral; // Represent integral part of digit number.
            var decimal; // Represent decimal part of digit number.
            var outputCharacters; // The output result.
            var parts;
            var digits, radices, bigRadices, decimals;
            var zeroCount;
            var i, p, d;
            var quotient, modulus;

            // Validate input string:
            if (currencyDigits === undefined) {
                return "";
            }
            currencyDigits = currencyDigits.toString();
            if (currencyDigits == "") {
                // alert("Empty input!");
                return "";
            }
            if (currencyDigits.match(/[^,.\d]/) != null) {
                // alert("Invalid characters in the input string!");
                return "";
            }
            if (
                currencyDigits.match(
                    /^((\d{1,3}(,\d{3})*(.((\d{3},)*\d{1,3}))?)|(\d+(.\d+)?))$/
                ) == null
            ) {
                // alert("Illegal format of digit number!");
                return "";
            }

            // Normalize the format of input digits:
            currencyDigits = currencyDigits.replace(/,/g, ""); // Remove comma delimiters.
            currencyDigits = currencyDigits.replace(/^0+/, ""); // Trim zeros at the beginning.
            // Assert the number is not greater than the maximum number.
            if (Number(currencyDigits) > MAXIMUM_NUMBER) {
                alert("您输入的金额太大，请重新输入!");
                return "";
            }

            // Process the coversion from currency digits to characters:
            // Separate integral and decimal parts before processing coversion:
            parts = currencyDigits.split(".");
            if (parts.length > 1) {
                integral = parts[0];
                decimal = parts[1];
                // Cut down redundant decimal digits that are after the second.
                decimal = decimal.substr(0, 2);
            } else {
                integral = parts[0];
                decimal = "";
            }
            // Prepare the characters corresponding to the digits:
            digits = new Array(
                CN_ZERO,
                CN_ONE,
                CN_TWO,
                CN_THREE,
                CN_FOUR,
                CN_FIVE,
                CN_SIX,
                CN_SEVEN,
                CN_EIGHT,
                CN_NINE
            );
            radices = new Array("", CN_TEN, CN_HUNDRED, CN_THOUSAND);
            bigRadices = new Array("", CN_TEN_THOUSAND, CN_HUNDRED_MILLION);
            decimals = new Array(CN_TEN_CENT, CN_CENT);
            // Start processing:
            outputCharacters = "";
            // Process integral part if it is larger than 0:
            if (Number(integral) > 0) {
                zeroCount = 0;
                for (i = 0; i < integral.length; i++) {
                    p = integral.length - i - 1;
                    d = integral.substr(i, 1);
                    quotient = p / 4;
                    modulus = p % 4;
                    if (d == "0") {
                        zeroCount++;
                    } else {
                        if (zeroCount > 0) {
                            outputCharacters += digits[0];
                        }
                        zeroCount = 0;
                        outputCharacters +=
                            digits[Number(d)] + radices[modulus];
                    }
                    if (modulus == 0 && zeroCount < 4) {
                        outputCharacters += bigRadices[quotient];
                    }
                }
                outputCharacters += CN_DOLLAR;
            }
            // Process decimal part if there is:
            if (decimal != "") {
                for (i = 0; i < decimal.length; i++) {
                    d = decimal.substr(i, 1);
                    if (d != "0") {
                        outputCharacters += digits[Number(d)] + decimals[i];
                    }
                }
            }
            // Confirm and return the final output string:
            if (outputCharacters == "") {
                outputCharacters = CN_ZERO + CN_DOLLAR;
            }
            if (decimal == "") {
                outputCharacters += CN_INTEGER;
            }
            outputCharacters = CN_SYMBOL + outputCharacters;
            return outputCharacters;
        }
    }
};
</script>

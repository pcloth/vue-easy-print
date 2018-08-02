# vue-easy-print
> 这是一个基于vue 2.0的打印组件
<p align="center">
   <a href="https://www.npmjs.com/package/vue-easy-print"><img src="https://img.shields.io/npm/v/vue-easy-print.svg?style=flat" alt="npm"></a>
   <a href="https://www.npmjs.com/package/vue-easy-print"><img src="https://img.shields.io/npm/dm/vue-easy-print.svg?style=flat" alt="npm"></a>
 </p>
 
[中文文档](./README.MD)

[English](./README.EN.MD)

# 核心:
> 使用vue组件的slot插槽进行模板加载。
> 使用iframe复制打印区域

# [在线demo](https://jsfiddle.net/pcloth/p35vz97u/)

## 更新
v0.0.7 修复兼容性问题。感谢[Wizard67](https://github.com/Wizard67)

## 快速开始

### 第一步:
``` sh
npm install vue-easy-print --save
```
### 第二步，在你的vue页面里
``` js
import vueEasyPrint from "vue-easy-print";
import demo from './your path/demo';

// in your vue <script>
export default {
    components: {
        vueEasyPrint,
        demo
    }
}
```

### 第三步，加载模板:
``` html
<vue-easy-print tableShow>
    <template slot-scope="func">
        <demo :getChineseNumber="func.getChineseNumber"></demo>
    </template>
</vue-easy-print>

```

## slot-scope
func.getChineseNumber接收到的方法是一个将金额转换成中文的


## 配置props参数
``` js
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
        // 复制打印页面前调用的钩子
        beforeCopy:Function,
        // 打印页面前调用的钩子
        beforePrint:Function,
```


## 完整demo
![Alt text](./images/demo.png)


## 代码
``` html
<template>
    <div id="app">
        <button @click="printDemo">测试打印</button>
        <vue-easy-print tableShow ref="easyPrint" >
            <!-- 你自己编写打印的模板 -->
            <!-- <template slot-scope="func">
                <demo :getChineseNumber="func.getChineseNumber" ></demo>
            </template> -->
        </vue-easy-print>
    </div>
</template>

<script>
import vueEasyPrint from "vue-easy-print";
import demo from "./components/demo";
export default {
  name: "App",
  data() {
    return {
      tableData: {
        id: 998,
        store_name: "测试店铺",
        created_at: "2018-06-06 15:21:35",

        detail: [
          {
            name: "商品A",
            item_unit: "40ML",
            item_size: "瓶",
            item_quantity: 5,
            item_price: 188,
            pv: 150,
            item_total: 5 * 188,
            item_total_pv: 5 * 150
          },
          {
            name: "商品A",
            item_unit: "40ML",
            item_size: "瓶",
            item_quantity: 5,
            item_price: 188,
            pv: 150,
            item_total: 5 * 188,
            item_total_pv: 5 * 150
          },
          {
            name: "商品A",
            item_unit: "40ML",
            item_size: "瓶",
            item_quantity: 5,
            item_price: 188,
            pv: 150,
            item_total: 5 * 188,
            item_total_pv: 5 * 150
          },
          {
            name: "商品A",
            item_unit: "40ML",
            item_size: "瓶",
            item_quantity: 5,
            item_price: 188,
            pv: 150,
            item_total: 5 * 188,
            item_total_pv: 5 * 150
          },
          {
            name: "商品A",
            item_unit: "40ML",
            item_size: "瓶",
            item_quantity: 5,
            item_price: 188,
            pv: 150,
            item_total: 5 * 188,
            item_total_pv: 5 * 150
          },
          {
            name: "商品A",
            item_unit: "40ML",
            item_size: "瓶",
            item_quantity: 5,
            item_price: 188,
            pv: 150,
            item_total: 5 * 188,
            item_total_pv: 5 * 150
          },
          {
            name: "商品A",
            item_unit: "40ML",
            item_size: "瓶",
            item_quantity: 5,
            item_price: 188,
            pv: 150,
            item_total: 5 * 188,
            item_total_pv: 5 * 150
          },
          {
            name: "商品A",
            item_unit: "40ML",
            item_size: "瓶",
            item_quantity: 5,
            item_price: 188,
            pv: 150,
            item_total: 5 * 188,
            item_total_pv: 5 * 150
          }
        ]
      }
    };
  },
  methods:{
    printDemo(){
      this.$refs.easyPrint.print()
    }
  },
  components: {
    vueEasyPrint,
    demo
  }
};
</script>

```
## License

[MIT](https://github.com/pcloth/vue-easy-print/blob/master/LICENSE)

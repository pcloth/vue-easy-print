# vue-easy-print
> 这是一个同时支持 Vue 2 / Vue 3 的打印组件。

<p align="center">
   <a href="https://www.npmjs.com/package/vue-easy-print"><img src="https://img.shields.io/npm/v/vue-easy-print.svg?style=flat" alt="npm"></a>
   <a href="https://www.npmjs.com/package/vue-easy-print"><img src="https://img.shields.io/npm/dm/vue-easy-print.svg?style=flat" alt="npm"></a>
 </p>

[中文文档](./README.MD)

[English](./README.EN.MD)

# 核心
> 使用 Vue 组件的 slot 插槽承载打印模板。
> 使用 iframe 复制打印区域并调用浏览器打印能力。

# [在线 demo](https://jsfiddle.net/pcloth/p35vz97u/)

## 更新

#### 2026-03-13 ver 1.0.0
- 同时支持 Vue 2 / Vue 3;
- 添加styleHTML参数，感谢 [mrliuc](https://github.com/mrliuc)
- 移除了一些不用的props参数，打印的样式控制都由模板自由控制。

#### 2021 ver 0.0.7
- 修复兼容性问题，感谢 [Wizard67](https://github.com/Wizard67)

## 快速开始

### 第一步
```sh
npm install vue-easy-print --save
```

### 第二步，在你的 Vue 页面里注册组件
```js
import vueEasyPrint from "vue-easy-print";
import demo from "./your path/demo";

export default {
    components: {
        vueEasyPrint,
        demo
    }
};
```

### 第三步，加载打印模板
```html
<vue-easy-print tableShow>
    <template slot-scope="func">
        <demo :getChineseNumber="func.getChineseNumber"></demo>
    </template>
</vue-easy-print>
```

## slot-scope
默认插槽会暴露 getChineseNumber 方法，可以在模板中把金额转换成中文大写金额。

## Props

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| tableShow | Boolean | false | 是否显示打印区域。 |
| buttonShow | Boolean | false | 是否显示组件内置的打印按钮。 |
| buttonClass | String | el-button el-button--default | 内置打印按钮的 class 名，默认沿用 Element UI 风格。 |
| beforeCopy | Function | - | 复制打印 DOM 前触发的钩子，可用于提前准备打印内容。 |
| beforePrint | Function | - | 调用浏览器打印前触发的钩子，可用于重绘二维码等内容。 |
| styleHTML | String | - | 不需要复制项目的style，自己传入一个固定的样式字符串 |

## Methods

| 方法名 | 参数 | 返回值 | 说明 |
| --- | --- | --- | --- |
| init | - | void | 初始化打印 iframe，并同步页面样式到打印上下文。通常在组件挂载后自动调用。 |
| print | - | void | 执行打印流程。支持通过 ref 手动调用，例如 this.$refs.easyPrint.print()。 |
| getStyle | - | void | 收集当前页面的 style 和 link 样式并注入到打印 iframe。一般无需手动调用。 |
| getChineseNumber | currencyDigits | String | 将数字金额转换为中文大写金额，适合在打印模板中展示金额。 |

## 完整 demo
![Alt text](./images/demo.png)

## 代码
```html
<template>
    <div id="app">
        <button @click="printDemo">测试打印</button>
        <vue-easy-print tableShow ref="easyPrint">
            <!-- 你自己编写打印的模板 -->
            <!-- <template slot-scope="func">
                <demo :getChineseNumber="func.getChineseNumber"></demo>
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
  methods: {
    printDemo() {
      this.$refs.easyPrint.print();
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

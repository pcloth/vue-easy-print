# vue-easy-print
> This is a vue.js-based printing component

## Quickstart

### step 1:
``` sh
npm install vue-easy-print --save
```
### step 2: in your vue
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

### step 3:
``` html
<vue-easy-print tableShow>
    <template slot-scope="func">
        <demo :getChineseNumber="func.getChineseNumber"></demo>
    </template>
</vue-easy-print>

```


## Config
``` js
printTemplate="demo"  // template name(template files in )

```


## Full demo
![Alt text](./images/demo.png)


## code
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

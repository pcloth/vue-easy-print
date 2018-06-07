<template>
    <div >
        <div v-for="page in pages" :key="page">
            <!-- 分页 -->
            <div class='tab_company_out'>
                <h3>你的公司名字有限公司</h3>
                <div class='dan'>进货单
                    <span>单据号：{{tableData.id}}</span>
                </div>
                <p>
                    <span>客户：{{tableData.store_name}}</span>
                    <time>{{tableData.created_at}}</time>
                </p>
                <table cellpadding='0' cellspacing='0'>
                    <tr>
                        <th width='5%'>序号</th>
                        <th width='25%'>商品名称</th>
                        <th width='5%'>单位</th>
                        <th width='10%'>规格</th>
                        <th width='5%'>数量</th>
                        <th width='8%'>单价</th>
                        <th width='8%'>积分</th>
                        <th width='12%'>总金额</th>
                        <th width='12%'>总积分</th>
                        <th width='10%'>说明</th>
                    </tr>
                    <!-- 每页显示onePageRow条数据 -->
                    <tr v-for="(row,index) in tableData.detail.slice((page-1)*onePageRow,page*onePageRow)" :key="index">
   
                        <td>{{(page-1)*onePageRow + index + 1}}</td>
                        <td>{{row.name}}</td>
                        <td>{{row.item_unit}}</td>
                        <td>{{row.item_size}}</td>
                        <td>{{row.item_quantity}}</td>
                        <td>{{row.item_price}}</td>
                        <td>{{row.pv}}</td>
                        <td>{{row.item_total}}</td>
                        <td>{{row.item_total_pv}}</td>
                        <td></td>
                    </tr>
                    <!-- 插入空白行 -->
                    <template v-if="blankLines===true && tableData.detail.slice((page-1)*onePageRow,page*onePageRow).length<5">
                        <tr v-for="d in (5-tableData.detail.slice((page-1)*onePageRow,page*onePageRow).length)" :key="`_${d}_`">
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </template>

                    <tr v-if="page==pages">
                        <td colspan='2'>合计</td>
                        <td colspan='5'>{{chineseTotal}}</td>
                        <td id='total'>{{tableData.total_amount}}</td>
                        <td>{{tableData.total_pv}}</td>
                        <td></td>
                    </tr>
                    <tr v-else>
                        <td colspan='2'>合计</td>
                        <td colspan='5'>(合计打印到最后一页)</td>
                        <td id='total'></td>
                        <td></td>
                        <td></td>
                    </tr>

                    <tr>
                        <td>备注</td>
                        <td colspan='9'></td>
                    </tr>
                </table>
                <ul class='lu'>
                    <li>发货人：
                        <label>{{tableData.delivery_user_name}}</label>
                    </li>
                    <li>出纳：
                        <label id='teller'>{{tableData.sale_user_name}}</label>
                    </li>
                    <li>制单：
                        <label id='single'></label>
                    </li>
                    <li>客户收货签字：
                        <label id='sign'></label>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name:'demo',
    // 制作打印模版组件时，props区域尽量保留。
    props: {
        // 接受的打印数据
        tableData: {
            type: Object,
            default() {
                return {
                    id:998,
                    store_name:'测试店铺',
                    created_at:'2018-06-06 15:21:35',
                    total_amount:35580,
                    total_pv:23231,
                    detail:[
                        {name:'商品A',item_unit:'40ML',item_size:'瓶',item_quantity:5,item_price:188,pv:150,item_total:5*188,item_total_pv:5*150},
                        {name:'商品A',item_unit:'40ML',item_size:'瓶',item_quantity:5,item_price:188,pv:150,item_total:5*188,item_total_pv:5*150},
                        {name:'商品A',item_unit:'40ML',item_size:'瓶',item_quantity:5,item_price:188,pv:150,item_total:5*188,item_total_pv:5*150},
                        {name:'商品A',item_unit:'40ML',item_size:'瓶',item_quantity:5,item_price:188,pv:150,item_total:5*188,item_total_pv:5*150},
                        {name:'商品A',item_unit:'40ML',item_size:'瓶',item_quantity:5,item_price:188,pv:150,item_total:5*188,item_total_pv:5*150},
                        {name:'商品A',item_unit:'40ML',item_size:'瓶',item_quantity:5,item_price:188,pv:150,item_total:5*188,item_total_pv:5*150},
                        {name:'商品A',item_unit:'40ML',item_size:'瓶',item_quantity:5,item_price:188,pv:150,item_total:5*188,item_total_pv:5*150},
                        {name:'商品A',item_unit:'40ML',item_size:'瓶',item_quantity:5,item_price:188,pv:150,item_total:5*188,item_total_pv:5*150},
                    ]
                }
            }
        },

        // 每页多少行
        onePageRow: {
            type:Number,
            default:5,
        },
        // 是否插入空白行
        blankLines:{
            type:Boolean,
            default:true
        },

        getChineseNumber: Function, // 求数字的中文写法，从easyPrint组件传入
    },
    data() {
        return {
            
        }
    },

    computed: {
        pages() {
            // 求当前数据能打印的页数
            var pages_ = Math.ceil(this.tableData.detail.length / this.onePageRow) // 向上取整数
            return pages_ <= 0 ? 1 : pages_
        },
        chineseTotal() {
            // 计算中文合计，如果忘记传入
            return this.getChineseNumber != null ? this.getChineseNumber(this.tableData.total_amount) : '您还没有传入getChineseNumber'
        },
    },

    methods:{
        test(){
            console.log('test');
        }
    }

}
</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
    list-style-type: none;
    font-family: "微软雅黑";
    font-size: 12px;
}

.tab_company_out {
    text-align: center;
    width: 100%;
    margin: auto;
    page-break-after: always;
}

h3 {
    font-size: 14px;
}

.dan {
    text-align: center;
    position: relative;
}

.dan span {
    position: absolute;
    right: 0;
}

p {
    overflow: hidden;
    padding: 10px 0;
}

p span {
    float: left;
}

p span ins {
    text-decoration: underline
}

p time {
    float: right;
}

table {
    width: 100%;
    border: none;
    border-bottom: 1px solid #000;
}

table tr td {
    border: 1px solid #000;
    border-bottom: none;
    border-right: none;
    height: 20px;
    line-height: 20px;
}

table tr td:last-of-type,
table tr th:last-of-type {
    border-right: 1px solid #000;
}

table tr th {
    border-top: 1px solid #000;
    border-left: 1px solid #000;
    height: 22px;
    line-height: 22px;
    font-size: 12px;
}

table tr th:nth-child(2) {
    width: 0;
}

.lu {
    display: inline-block;
    padding-top: 10px;
}

.lu li {
    float: left;
    text-align: left;
    margin-right: 15px;
}

.lu li label {
    width: 100px;
    display: inline-block;
}

.lu li:last-of-type {
    margin-right: 0;
}
</style>

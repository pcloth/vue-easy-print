<template>
    <div>
        <button @click="printDemo">测试打印</button>
        <vue-easy-print tableShow ref="easyPrint" >
            <template slot-scope="func">
                <demo :getChineseNumber="func.getChineseNumber"></demo>
            </template>
        </vue-easy-print>
    </div>
</template>

<script>
import vueEasyPrint from "../src/lib/vue-easy-print";
import demo from "./demo"

export default {
    props: {},
    data() {
        return {};
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    updated() {},
    methods: {
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

<style scoped>
</style>
<template>
    <body>
        <el-card>
            <el-table :data="coinData" stripe height="600" style="width: 100%">
                <el-table-column prop="name" label="币种" />
                <el-table-column prop="price_cny" label="现价(美元)" />
                <el-table-column prop="price_usd" label="现价(人民币)" />
            </el-table>
        </el-card>
    </body>
</template>

<script setup>
import { ref } from "vue"
import { getCoin } from '../api/api'

const coinData = ref([])


getCoin().then((res) => {
    console.log(res)
    coinData.value = res.data
})


</script>

<style scoped></style>
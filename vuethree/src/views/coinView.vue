<template>
    <body>
        <el-card>
            <el-table :data="coinData" stripe height="600" style="width: 100%">
                <el-table-column prop="name" label="币种" />
                <el-table-column prop="price_cny" label="现价(美元)" />
                <el-table-column prop="price_usd" label="现价(人民币)" />
            </el-table>
            <div style="display: flex;justify-content: center;">
                <el-pagination :total="total" layout="sizes, prev, pager, next, jumper, total" :page-sizes="[5, 10, 20, 50]"
                    v-model:current-page="pageCurrent" v-model:page-size="pageSize" @size-change="getData"
                    @current-change="getData" />
            </div>
        </el-card>
    </body>
</template>

<script setup>
import { ref } from "vue"
import { getCoin } from '../api/api'

const coinData = ref([])
const pageCurrent = ref(1)
const pageSize = ref(10)
const total = ref(0)

getData()

function getData() {
    getCoin(pageCurrent.value, pageSize.value).then((res) => {
        coinData.value = res.data.data
        total.value = res.data.total
    })
}

</script>

<style scoped></style>
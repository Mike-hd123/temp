<template>
    <el-card>
        <el-form :model="form" :inline="true" label-width="120px" @submit.native.prevent>
            <el-form-item label="币种">
                <el-input v-model="form.name" @change="onSearch" />
            </el-form-item>
            <el-form-item>
                <el-button circle type="primary" @click="onSearch">
                    <template #icon>
                        <el-icon>
                            <i-ep-search />
                        </el-icon>
                    </template>
                </el-button>
            </el-form-item>
        </el-form>
        <el-table :data="coinData" stripe height="650" style="width: 100%">
            <el-table-column prop="name" label="币种" />
            <el-table-column prop="price_usd" label="现价(美元)" />
            <el-table-column prop="price_cny" label="现价(人民币)" />
        </el-table>
        <div style="display: flex;justify-content: center;padding-top: 13px;">
            <el-pagination :total="total" layout="sizes, prev, pager, next, jumper, total" :page-sizes="[5, 10, 20, 50]"
                v-model:current-page="pageCurrent" v-model:page-size="pageSize" @size-change="getData"
                @current-change="getData" />
        </div>
    </el-card>
</template>

<script setup>
import { ref } from "vue"
import { getCoin } from '../api/api'

const coinData = ref([])
const form = ref({})
const pageCurrent = ref(1)
const pageSize = ref(10)
const total = ref(0)

getData()

function getData() {
    var page = {
        current: pageCurrent.value,
        size: pageSize.value
    }
    getCoin(page, form.value).then((res) => {
        coinData.value = res.data.data
        total.value = res.data.total
    })
}

function onSearch() {
    getData()
}

</script>

<style scoped></style>
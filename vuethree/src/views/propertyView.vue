<template>
    <el-card>
        <el-table :data="listData" stripe height="750" style="width: 100%">
            <el-table-column prop="name" label="名称" />
            <el-table-column prop="type" label="类型">
                <template #default="scope">
                    <el-tag v-if="scope.row.type == 'coin'" type="success">加密货币</el-tag>
                    <el-tag v-else-if="scope.row.type == 'deposit'">存款</el-tag>
                    <el-tag v-else-if="scope.row.type == 'liabilities'" type="danger">负责</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="total" label="数量" />
            <el-table-column prop="interest" label="利率" :formatter="formatInterest" />
            <el-table-column prop="update" label="更新日期" :formatter="formatDate" />
        </el-table>
    </el-card>
</template>


<script setup>
import { ref } from "vue"
import { getProperty } from '../api/api'

const listData = ref([])
const total = ref(0)

getData()

function getData() {
    getProperty().then((res) => {
        listData.value = res.data.data
        total.value = res.data.total
    })
}

function formatDate(row, column) {
    // 获取单元格数据
    let datac = row[column.property];
    var data = new Date(datac)
    return data.toLocaleString().replaceAll('/', '-')
}

function formatInterest(row, column) {
    let value = row[column.property]
    return value * 100 + '%'
}

</script>

<style scoped></style>
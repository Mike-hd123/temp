<template>
    <el-tabs type="border-card">
        <el-tab-pane label="List">
            <el-form :model="formSearch" :inline="true" label-width="120px" @submit.native.prevent>
                <el-form-item label="名称">
                    <el-input v-model="formSearch.name" />
                </el-form-item>
                <el-form-item>
                    <!-- 搜索按钮 -->
                    <el-button circle type="primary">
                        <template #icon>
                            <el-icon>
                                <i-ep-search />
                            </el-icon>
                        </template>
                    </el-button>
                    <!-- 添加按钮 -->
                    <el-button circle type="success" @click="add">
                        <template #icon>
                            <el-icon>
                                <i-ep-CirclePlus />
                            </el-icon>
                        </template>
                    </el-button>
                </el-form-item>
            </el-form>
            <el-table :data="listData" stripe height="650" style="width: 100%">
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
                <el-table-column prop="option" label="操作">
                    <template #default="scop">
                        <el-button type="primary" circle @click="edit(scop.row)">
                            <template #icon>
                                <el-icon>
                                    <i-ep-Edit />
                                </el-icon>
                            </template>
                        </el-button>
                        <el-button type="danger" circle @click="del(scop.row.id)">
                            <template #icon>
                                <el-icon>
                                    <i-ep-Delete />
                                </el-icon>
                            </template>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="display: flex;justify-content: center;padding-top: 13px;">
                <el-pagination :total="total" layout="sizes, prev, pager, next, jumper, total" :page-sizes="[5, 10, 20, 50]"
                    v-model:current-page="pageCurrent" v-model:page-size="pageSize" @size-change="getData"
                    @current-change="getData" />
            </div>
            <el-dialog v-model="dialogVisible" :title="option" width="30%">
                <el-form label-position="left" label-width="100px" :model="form" style="max-width: 460px">
                    <el-form-item label="名称">
                        <el-input v-model="form.name" />
                    </el-form-item>
                    <el-form-item label="类型">
                        <el-select v-model="form.type" placeholder="Select" style="width:100%;">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="数量">
                        <el-input v-model="form.total" />
                    </el-form-item>
                    <el-form-item label="利率">
                        <el-input v-model="form.interest" />
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="dialogVisible = false">取消</el-button>
                        <el-button type="primary" @click="comfine">
                            {{ option }}
                        </el-button>
                    </span>
                </template>
            </el-dialog>
        </el-tab-pane>
        <el-tab-pane label="view">
            <div style="display: flex;align-items: center;justify-content: center;">
                <div id="coke" style="width:300px; height:300px;"></div>
            </div>
            <el-tag>{{ cakes.total }}</el-tag>
        </el-tab-pane>
    </el-tabs>
</template>


<script setup>
import { ref } from "vue"
import * as echarts from "echarts";
import { getProperty, addProperty, editProperty, delProperty, cake } from '../api/api'

const dialogVisible = ref(false)
const option = ref('添加')
const listData = ref([])
const pageCurrent = ref(1)
const pageSize = ref(10)
const total = ref(0)
const form = ref({})
const formSearch = ref({})
const cakes = ref({
    tooltip: {
        show: false
    },
    total: 0,
    legend: {
        top: '5%',
        left: 'center',
        formatter: function (name) {
            let data = cakes.value.series[0].data
            let total = 0
            let tarValue
            for (let i = 0; i < data.length; i++) {
                total += data[i].value
                if (data[i].name == name) {
                    tarValue = data[i].value
                }
            }
            cakes.value.total = total
            //计算出百分比
            let p = Math.round((tarValue / total) * 100) + '%'
            return `${name}  ${p}`
        },
    },
    series: [
        {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: 40,
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
            ]
        }
    ]
})
const options = [
    {
        label: '加密货币',
        value: 'coin'
    },
    {
        label: '存款',
        value: 'deposit'
    },
    {
        label: '负债',
        value: 'liabilities'
    }
]

getData()

function getData() {
    getProperty().then((res) => {
        listData.value = res.data.data
        total.value = res.data.total
    })
    cake().then(res => {
        cakes.value.series[0].data = res.data
        var mycharts = echarts.init(document.getElementById('coke'))
        mycharts.setOption(cakes.value)
    })
}

function add() {
    option.value = "添加"
    form.value = {}
    dialogVisible.value = true
}

function edit(row) {
    option.value = "修改"
    form.value = row
    dialogVisible.value = true
}

function comfine() {
    dialogVisible.value = false
    var data = form.value
    delete data.price
    if (option.value == "添加") {
        addProperty(data).then(res => {
            const { data, status } = res
            if (status == 201) {
                ElMessage({
                    type: 'success',
                    message: '已添加',
                })
                getData()
            }
        })
    } else {
        editProperty(data).then(res => {
            const { data, status } = resc
            if (status == 201) {
                ElMessage({
                    type: 'success',
                    message: '已修改',
                })
                getData()
            }
        })
    }
}

function del(id) {
    ElMessageBox.confirm(
        '确认删除?',
        'Warning',
        {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(() => {
        delProperty(id).then(res => {
            const { data, status } = res
            if (status == 200) {
                ElMessage({
                    type: 'success',
                    message: '已删除',
                })
                getData()
            }
        })
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
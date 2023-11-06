<template>
    <div class="sidebar">
        <el-menu style="border-right: none;" :collapse="props.collapse" default-active="/" height="100%" router>
            <el-menu-item v-for="(item, i) in radiusGroup" :key="i" :index="item.url">
                <el-icon>
                    <component :is="item.icon"></component>
                </el-icon>
                <template #title>{{ item.name }}</template>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script setup>
import { ref, markRaw } from "vue";
import { Coin, Postcard } from '@element-plus/icons-vue'

const props = defineProps({
    collapse: Boolean
});

const radiusGroup = ref([
    {
        name: "home",
        url: "/",
        icon: markRaw(Coin)
    }, {
        name: "property",
        url: "/property",
        icon: markRaw(Postcard)
    }
]);
</script>


<style scoped>
.sidebar {
    margin: 0px;
    padding: 0px;
}

.is-active {
    background: #3697f9;
    color: white;
    border-radius: 50px;
}

.sidebar-version {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 20px;
}

.sidebar-version-label {
    font-size: 14px;
    color: #2c8af8;
    text-shadow: 0 2px 6px rgb(44 138 248 / 40%);
}

.sidebar-version-text {
    text-align: center;
    font-size: 14px;
    margin: 8px 0;
    padding: 0 10px;
    color: #54759a;
}
</style>
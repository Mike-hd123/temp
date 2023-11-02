<template>
  <el-container class="app">
    <el-header class="header"></el-header>
    <el-container>
      <el-aside :style="sideStyle">
        <el-icon @click="more" :style="moreStyle">
          <i-ep-more />
        </el-icon>
        <sidebar :collapse="collapse" />
      </el-aside>
      <el-main>
        <RouterView class="router" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref } from "vue";
import sidebar from './sidebar/index.vue'
import { RouterView } from 'vue-router'


const collapse = ref(true)
const moreStyle = ref({
    'padding': '25px auto',
    'background-color': '#b1b5b7',
    'height':'25px',
    'width': collapse ? '64px' : '200px'
  })
const sideStyle = ref({
  'border-right': 'solid 1px var(--el-menu-border-color)',
  'width': collapse ? '65px' : '201px'
})

function more() {
  collapse.value = !collapse.value
  setTimeout(() => {
    moreStyle.value.width =  collapse.value ? '64px' : '200px'
    sideStyle.value.width =  collapse.value ? '65px' : '201px'
  }, 300);
  
}
</script>

<style>
html,
body,
#app,
.app,
.router {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

.header {
  background-color: #3697f9
}
</style>

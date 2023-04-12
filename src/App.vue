<template>
    <div class="app">
        <MyNavbar />
        <div class="main">
            <RouterView />
        </div>    
    </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import MyNavbar from "@/components/MyNavbar.vue"
</script>

<style scoped>
* {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
</style>

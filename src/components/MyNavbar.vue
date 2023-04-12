<template>
    <nav class="navbar navbar-expand-lg bg-primary">
        <div class="container-fluid">
            <div class="navbar-brand text-light">Navbar</div>
                <div style="cursor: pointer;" class="nav-item navbar-nav me-auto my-3 my-lg-0 navbar-nav-scroll" >
                    <div @click="$router.push({name: 'home'})" :style="{'color': $route.name === 'home' ? 'black' : '#fff'}" class="nav-link" aria-current="page">Home</div>
                    <div @click="$router.push({name: 'posts'})" :style="{'color': $route.name === 'posts' ? 'black' : '#fff'}" class="nav-link" aria-current="page">Posts</div>
                </div>
            </div>
        </nav>
</template>

<script setup lang="ts">
</script>

<style scoped>
nav {
    color: #fff;
}
</style>
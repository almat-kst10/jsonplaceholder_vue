<template>
    <div class="Detail">
        <div class="header">
            <button type="button" class="btn btn-primary" @click="$router.back()">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                </svg>
                Назад
            </button>
        </div>
        <div v-if="!loading" class="text-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <div class="body" v-else>
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">id</th>
                    <th scope="col">userId</th>
                    <th scope="col">title</th>
                    <th scope="col">body</th>
                    </tr>
                </thead>
                <tbody v-if="postDetail !== null">
                    <tr>
                        <th>{{postDetail.id}}</th>
                        <td>{{postDetail.userId}}</td>
                        <td>{{postDetail.title}}</td>
                        <td>{{postDetail.body}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { httpGet } from '@/utils/http'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
const postDetail = ref<any>(null)
const loading = ref<boolean>(true)

onMounted(() => {
    fetchPostsList()
})

const fetchPostsList = () => {
    loading.value = false
    httpGet({
        url: `https://jsonplaceholder.typicode.com/posts/${route.params.id}`,
        detailResponse: true,
        onSuccess: json => {
            if (json.ok) {
                postDetail.value = json.json
            } else {
                console.log(json, 'error')
            }
        },
        onError: error => {
            console.log(error)
        },
        doFinally: () => {
            loading.value = true
        }
    })
}
</script>

<style scoped>
.Detail {
    padding: 10px;
}
</style>
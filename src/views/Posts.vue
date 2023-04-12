<template>
    <div class="Posts">
        <div class="posts_title mb-2 font-weight-bold text-uppercase text-center">Cписок постов - {{searchAndFilterPosts.length}}</div>
        <input v-model="searchText" class="form-control mb-2" type="search" placeholder="Search" aria-label="Search">
        <div class="d-flex align-items-center justify-content-between mb-2">
            <MySelect :sortArray="sortArray" @submit="selectSubmit" />
            <div @click="isShown = true" class="d-flex align-items-center p-2" style="cursor: pointer; border: 1px solid #0d6efd; border-radius: 6px; color: #0d6efd;">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#0d6efd" class="bi bi-plus-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
                <div style="margin-left: 5px;">
                    Создать запись
                </div>
            </div>
            <div class="modal" :class="{'show': !isShown}">
                <div class="modal-content">
                    <div class="modals">
                        <p>Создать поcт</p>
                        <span class="close" style="cursor: pointer;" @click="isShown = false">&times</span>
                    </div>
                    <input v-model="formData.title" type="text" class="form-control mb-2" placeholder="Заголовок" aria-label="Text input with dropdown button">
                    <input v-model="formData.body" type="text" class="form-control mb-2" placeholder="Текст" aria-label="Text input with dropdown button">
                    <button @click="createPost()" style="margin-left: auto" class="btn btn-primary">Создать</button>
                </div>
            </div>
        </div>
        <div v-if="!loading" class="text-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <div v-else class="lists">
            <div class="card mb-2" v-for="post in searchAndFilterPosts" :key="post.id">
                <div class="card-body d-flex align-items-center justify-content-between">
                    <div class="card-content">
                        <h5 class="card-title">{{post.id}} - {{post.title}}</h5>
                        <p class="card-text">{{post.body}}</p>
                    </div>
                    <div>
                        <button type="button" class="btn btn-primary" @click="$router.push({name: 'detail', params: { id: post.id }})">просмотр</button>
                        <button type="button" class="btn btn-danger ml-2" @click="deletePost(post.id)">удаление</button>
                    </div>
                </div>
            </div>
            <nav style="cursor: pointer;">
                <ul class="pagination">
                    <li class="page-item" @click="params.page = page" v-for="page in params.pageLen" :key="page"><div class="page-link" :style="{'background': page === params.page ? 'blue' : '#fff', 'color': page === params.page ? '#fff' : 'blue'}" >{{page}}</div></li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch, reactive } from "vue";
import MySelect from '@/components/MySelect.vue'
import { httpGet, httpPost, httpDelete } from '@/utils/http'

const posts = ref<any[]>([])
const searchText = ref<string>('')
const loading = ref<boolean>(true)
const isShown = ref<boolean>(false)
const myModal = ref(null)

// params 
interface Params {
  page: number;
  limit: number;
  pageLen: number;
}

const params = reactive<Params>({
    page: 1,
    limit: 10,
    pageLen: 10
})

interface SortOption {
  id: number;
  text: string;
  value: string;
}
// select logic
const sortArray = ref<SortOption[]>([
    {id: 1, text: 'По индексу', value: 'index'},
    {id: 2, text: 'По названию', value: 'name'},
])

const selectSort = ref<string>('')

const selectSubmit = (value: string): void => {
    selectSort.value = value
}

// filter - search
watch(selectSort, (val: any) => {
    if (val === 'index') {
        posts.value.sort((a: any, b: any) => {
            if (a.id < b.id) {
                return -1;
            }
            return 1
        })
    }
    if (val === 'name') {
        posts.value.sort((a: any, b: any) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1;
            }
            return 1
        })
    }
})

const searchAndFilterPosts = computed(() => {
    return posts.value.filter((x: any) => x.title.toLowerCase().includes(searchText.value.toLowerCase()))
})

// hooks
onMounted(() => {
    fetchPostsList()
})

watch(params, () => {
    fetchPostsList()
})

// get
const fetchPostsList = (): void => {
    loading.value = false
    httpGet({
        url: `https://jsonplaceholder.typicode.com/posts?_page=${params.page}&_limit=${params.limit}}`,
        detailResponse: true,
        onSuccess: json => {
            if (json.ok) {
                posts.value = json.json
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

// create post
const formData = reactive({
    title: '',
    body: ''
})

const createPost = (): void => {
    httpPost({
        url: `https://jsonplaceholder.typicode.com/posts/`,
        detailResponse: true,
        body: formData,
        onSuccess: json => {
            isShown.value = false
            fetchPostsList()
            formData.title = ''
            formData.body = ''
        },
        onError: error => {
            console.log(error)
        },
        doFinally: () => {
        }
    })
}

// delete
const deletePost = (id: number): void => {
    httpDelete({
        url: `https://jsonplaceholder.typicode.com/posts/${id}`,
        detailResponse: true,
        onSuccess: json => {
            if (json.json) {
                alert('Успешно удалено')
                fetchPostsList()
            }
        },
        onError: error => {
            console.log(error)
        },
        doFinally: () => {
        }
    })
}


</script>

<style scoped>
.Posts {
    position: relative;
    z-index: 1;
    padding: 20px;
}
.posts_title {
    font-weight: 600;
}
.card-content {
    width: 60%;
}

.modal {
  display: flex;
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

.show {
    display: none;
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 20% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 50%; /* Could be more or less, depending on screen size */
  height: 250px;
}

.modals {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/* The Close Button */
.close {
  color: black;
  float: right;
  font-size: 28px;
  font-weight: bold;
}
</style>
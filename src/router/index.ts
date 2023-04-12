import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

import Posts from '@/views/Posts.vue'
import DetailPost from '@/views/DetailPost.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/posts',
            name: 'posts',
            component: Posts
        },
        {
            path: '/posts/:id',
            name: 'detail',
            component: DetailPost
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: {
                name: 'posts'
            }
        }
    ]
})

export default router

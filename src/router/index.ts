import { createRouter, createWebHistory } from 'vue-router'

import Login from '../pages/Login.vue'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../pages/Register.vue'),
  },
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('../pages/Dashboard.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'admin/course/new',
        name: 'adminCourseNew',
        component: () => import('../pages/AdminCourseNew.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'admin/course/edit',
        name: 'adminCourseEdit',
        component: () => import('../pages/AdminCourseEdit.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'courses',
        name: 'courses',
        component: () => import('../pages/Courses.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'my-courses',
        name: 'myCourses',
        component: () => import('../pages/MyCourses.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'courses/:id',
        name: 'courseDetail',
        component: () => import('../pages/CourseDetail.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'courses/:course_id/lessons/:lesson_id',
        name: 'courseDetailLesson',
        component: () => import('../pages/CourseDetailLesson.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'courses/:course_id/certificate',
        name: 'courseDetailCertificate',
        component: () => import('../pages/CourseDetailCertificate.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'courses/:course_id/quiz',
        name: 'quiz',
        component: () => import('../pages/Quiz.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('../views/AboutView.vue'),
        meta: { requiresAuth: true },
      },
    ],
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.token) {
    next('/')
  } else {
    next()
  }
})

export default router

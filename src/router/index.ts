import { createRouter, createWebHistory } from "vue-router";
import App from "@/App.vue";
import AuthPage from "@/views/auth/auth-page.vue";
import LoginPage from "@/views/auth/login-page.vue";
import RegisterPage from "@/views/auth/register-page.vue";
import MainPage from '@/views/main/main-page.vue'
import TasksPage from '@/views/main/tasks-page.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: App,
      redirect: "/auth",
      children: [
        {
          path: "/auth",
          name: "auth",
          redirect: "/auth/login",
          component: AuthPage,
          children: [
            {
              path: "/auth/login",
              name: "auth-login",
              component: LoginPage,
            },
            {
              path: "/auth/register",
              name: "auth-register",
              component: RegisterPage,
            },
          ],
        },
        {
          path: '/home',
          name: 'main',
          redirect: '/home/tasks',
          component: MainPage,
          children: [
            {
              path: '/home/tasks',
              name: 'main-tasks',
              component: TasksPage,
            }
          ]
        },
      ],
    },
  ],
});

export default router;

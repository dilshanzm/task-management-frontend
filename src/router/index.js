
import { createRouter, createWebHistory } from 'vue-router';
import ErrorPage from '/src/components/ErrorPage.vue';
import Signin from '/src/components/Signin.vue';
import Signup from '/src/components/Signup.vue';
import Tasks from '/src/components/Tasks.vue';
import api from '../utils/axios';
const routes = [
    { path: '/', name: 'SigninDefault', component: Signin },
    { path: '/auth/sign-in', name: 'Signin', component: Signin },
    { path: '/auth/sign-up', name: 'Signup', component: Signup },
    { path: '/dashboard/tasks', name: 'Tasks', component: Tasks, meta: { requiresAuth: true } },
    { path: '/:pathMatch(.*)*', redirect: '/auth/access', name: 'ErrorPage2' },
    { path: '/auth/access', name: 'ErrorPage', component: ErrorPage }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// // 🔐 **Navigation Guard**
router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const token = localStorage.getItem('token'); 
        if (!token) {
            next('/auth/sign-in'); 
        } else {
            try {
                const response = await api.get('/tasks/verify-token'); 
                if (response.status === 200) {
                    next();
                } else {
                    localStorage.clear();
                    next('/auth/sign-in'); 
                }
            } catch (error) {
                console.error('JWT verification failed:', error);
                localStorage.clear(); 
                next('/auth/sign-in'); 
            }
        }
    } else {
        next(); // Continue navigation for public routes
    }
});
export default router;

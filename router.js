import Index from './components/Index.js';
import Tag from './components/Tag.js';
import Login from './components/Login.js';
import Profile from './components/Profile.js';
import Register from './components/Register.js';

export const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            name: 'index',
            path: '/',
            component: Index
        },
        {
            name: 'tag',
            path: '/tags',
            component: Tag
        },
        {
            name: 'login',
            path: '/login',
            component: Login
        },
        {
            name: 'register',
            path: '/register',
            component: Register
        },
        {
            name: 'profile',
            path: '/profile',
            component: Profile
        }
    ]
});
import Post from './components/Post.js';
import Tag from './components/Tag.js';
import Login from './components/Login.js';
import Profile from './components/Profile.js';
import Register from './components/Register.js';
import NewPost from './components/NewPost.js';

export const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            name: 'posts',
            path: '/',
            component: Post
        },
        {
            name: 'tags',
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
        },
        {
            name: 'new_post',
            path: '/new_post',
            component: NewPost
        }
    ]
});
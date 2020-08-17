import Posts from './components/Posts.js';
import Post from './components/Post.js';
import Tag from './components/Tag.js';
import Login from './components/Login.js';
import Profile from './components/Profile.js';
import Register from './components/Register.js';
import NewPost from './components/NewPost.js';
import EditPost from './components/EditPost.js';

export const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            name: 'posts',
            path: '/',
            component: Posts,
            meta: { title: 'Posts' }
        },
        {
            name: 'post',
            path: '/post/:slug',
            component: Post
        },
        {
            name: 'tags',
            path: '/tags',
            component: Tag,
            meta: { title: 'Tags' }
        },
        {
            name: 'login',
            path: '/login',
            component: Login,
            meta: { title: 'Login' }
        },
        {
            name: 'register',
            path: '/register',
            component: Register,
            meta: { title: 'Register' }
        },
        {
            name: 'profile',
            path: '/profile',
            component: Profile,
            meta: { title: 'Profile' }
        },
        {
            name: 'new_post',
            path: '/new_post',
            component: NewPost,
            meta: { title: 'New post' }
        },
        {
            name: 'edit_post',
            path: '/edit_post/:id',
            component: EditPost,
            meta: { title: 'Edit post' }
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next();
});
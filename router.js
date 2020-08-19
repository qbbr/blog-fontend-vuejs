import Posts from './views/Posts.js';
import Post from './views/Post.js';
import Tags from './views/Tags.js';
import Login from './views/Login.js';
import Profile from './views/Profile.js';
import Register from './views/Register.js';
import NewPost from './views/NewPost.js';
import EditPost from './views/EditPost.js';

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
            component: Tags,
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
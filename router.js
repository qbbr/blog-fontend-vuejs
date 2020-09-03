// public
import Posts from './views/Posts.js';
import Post from './views/Post.js';
import Tags from './views/Tags.js';
import Login from './views/Login.js';
import Register from './views/Register.js';
// userspace
import Profile from './views/User/Profile.js';
import NewPost from './views/User/NewPost.js';
import EditPost from './views/User/EditPost.js';
import UserPost from './views/User/Post.js';
import UserPosts from './views/User/Posts.js';

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
            path: '/user/profile',
            component: Profile,
            meta: { title: 'Profile' }
        },
        {
            name: 'new_post',
            path: '/user/post/new',
            component: NewPost,
            meta: { title: 'New post' }
        },
        {
            name: 'edit_post',
            path: '/user/post/edit/:id',
            component: EditPost,
            meta: { title: 'Edit post' }
        },
        {
            name: 'user_post',
            path: '/user/post/:id',
            component: UserPost
        },
        {
            name: 'user_posts',
            path: '/user/posts',
            component: UserPosts,
            meta: { title: 'My posts' }
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next();
});

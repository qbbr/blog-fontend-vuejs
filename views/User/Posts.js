import Posts from '../../mixins/Posts.js';

export default {
    name: 'Posts',
    mixins: [Posts],
    data() {
        return {
            postsUrl: 'user/posts/',
            routeName: 'user_posts'
        }
    }
};

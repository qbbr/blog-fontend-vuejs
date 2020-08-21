import '../components/blog-post.js';
import Posts from '../mixins/Posts.js';

export default {
    name: 'UserPosts',
    mixins: [Posts],
    data() {
        return {
            postsUrl: 'user/posts/'
        }
    }
}

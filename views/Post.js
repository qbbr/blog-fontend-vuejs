import '../components/blog-post.js';

export default {
    name: 'Post',
    template: `
        <div class="container" :class="{ 'loading': loading }">
            <div v-if="post.length === 0" style="height: 400px;" class="no-content">post not found</div>
            <div v-else>
                <blog-post :post="post" :isDetail="true"></blog-post>
            </div>
        </div>
    `,
    data() {
        return {
            loading: true,
            post: []
        }
    },
    mounted() {
        this.getPost();
        this.$root.$on('post.removed', id => {
            this.$router.push({ name: 'posts' });
        });
    },
    methods: {
        getPost() {
            this.loading = true;
            const slug = this.$route.params.slug;
            Vue.http.get('post/' + slug + '/').then(response => {
                document.title = this.post.title;
                this.post = response.data;
                this.loading = false;
            }, response => {
                if (404 === response.status) {
                    this.loading = false;
                }
            });
        }
    }
}
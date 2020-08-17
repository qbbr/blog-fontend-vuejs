export default {
    name: 'Post',
    template: `
        <div class="container" :class="{ 'loading': loading }">
            <div v-if="post.length !== 0">
                <h2>{{ post.title }}</h2>
                <div class="mb-2">
                    <time :datetime="post.createdAt">{{ post.createdAt | formatDate }}</time>
                    by <b>{{ post.user.username }}</b>
                </div>
                <div>
                    <router-link :to="{ name: 'posts', query: { tag: tag.name } }" v-for="tag in post.tags" :key="tag.name">{{ tag.name }}</router-link>
                </div>
                <p class="text-justify">{{ post.text }}</p>
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
    },
    methods: {
        getPost() {
            this.loading = true;
            const slug = this.$route.params.slug;
            Vue.http.get('post/' + slug + '/').then(response => {
                this.post = response.data;
                document.title = this.post.title;
                this.loading = false;
            }, response => {
                this.loading = false;
            });
        }
    }
}
import '../components/blog-post.js';

export default {
    template: `
        <div class="container" :class="{ 'loading': loading }">
            <div v-if="posts.length === 0" style="height: 400px;" class="no-content">no posts...</div>
            <div v-else>
                <template v-for="(post, index) in posts">
                    <blog-post :post="post" :isDetail="false"></blog-post>
                    <hr v-if="posts.length - 1 !== index" />
                </template>
            </div>
            <nav aria-label="Page navigation example" v-if="pages.length > 1">
                <hr/>
                <ul class="pagination justify-content-center">
                    <li class="page-item" :class="{ 'disabled': page === 1 }">
                        <router-link :to="{ name: 'posts', query: getParams(page - 1) }" class="page-link">Previous</router-link>
                    </li>
                    <li class="page-item" v-for="p in pages" :class="{ 'active': p === page }">
                        <router-link :to="{ name: 'posts', query: getParams(p) }" class="page-link">{{ p }}</router-link>
                    </li>
                    <li class="page-item" :class="{ 'disabled': page === pages.length  }">
                        <router-link :to="{ name: 'posts', query: getParams(page + 1) }" class="page-link">Next</router-link>
                    </li>
                </ul>
            </nav>
        </div>
    `,
    data() {
        return {
            loading: true,
            postsUrl: '',
            posts: [],
            pages: []
        }
    },
    mounted() {
        this.getPosts();
        this.$root.$on('post.removed', id => {
            this.getPosts();
        });
    },
    computed: {
        page() {
            return Number(this.$route.query.page) || 1;
        },
        tag() {
            return this.$route.query.tag || '';
        },
        query() {
            return this.$route.query.query || '';
        }
    },
    watch: {
        page: 'getPosts',
        tag: 'getPosts',
        query: 'getPosts'
    },
    methods: {
        getParams(page) {
            const params = {};
            if (page !== 1) {
                params.page = page;
            }
            if (this.tag.length) {
                params.tag = this.tag;
            }
            if (this.query.length) {
                params.query = this.query;
            }

            return params;
        },
        getPosts() {
            this.loading = true;
            Vue.http.get(this.postsUrl, { params: this.getParams(this.page) }).then(response => {
                this.pages = [...Array(Math.ceil(response.data.total / response.data.pageSize)).keys()].map(x => ++x);
                this.posts = response.data.results;
                this.loading = false;
            });
        }
    }
}
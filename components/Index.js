export default {
    name: 'Index',
    template: `
        <div class="container" :class="{ 'loading': loading }">
            <div v-if="posts.length === 0" style="height: 400px;"></div>
        
            <div v-for="post in posts" :key="post.id">
                <h2><a :href="'/post/' + post.slug">{{ post.title }}</a></h2>
                <div class="mb-2">
                    <time :datetime="post.createdAt">{{ post.createdAt | formatDate }}</time>
                    by <b>{{ post.user.username }}</b>
                </div>
                <div>
                    <router-link :to="{ name: 'index', query: { tag: tag.name } }" v-for="tag in post.tags" :key="tag.name">{{ tag.name }}</router-link>
                </div>
                <p class="text-justify">{{ post.text }}</p>
            </div>
            
            <nav aria-label="Page navigation example" v-if="pages.length > 1">
                <ul class="pagination justify-content-center">
                    <li class="page-item" :class="{ 'disabled': page === 1 }">
                        <router-link :to="{ name: 'index', query: getParams(page - 1) }" class="page-link">Previous</router-link>
                    </li>
                    <li class="page-item" v-for="p in pages" :class="{ 'active': p === page }">
                        <router-link :to="{ name: 'index', query: getParams(p) }" class="page-link">{{ p }}</router-link>
                    </li>
                    <li class="page-item" :class="{ 'disabled': page === pages.length  }">
                        <router-link :to="{ name: 'index', query: getParams(page + 1) }" class="page-link">Next</router-link>
                    </li>
                </ul>
            </nav>
        </div>
    `,
    data() {
        return {
            loading: true,
            posts: [],
            pages: []
        }
    },
    mounted() {
        this.getPosts();
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
            Vue.http.get('posts/', { params: this.getParams(this.page) }).then(response => {
                let pages = [];
                for (let i = 1; i <= Math.ceil(response.data.total / 10); i++) {
                    pages.push(i);
                }
                this.pages = pages;
                this.posts = response.data.results;
                this.loading = false;
            }, response => {
                this.loading = false;
            });
        }
    },
    filters: {
        formatDate: d => {
            return moment(String(d)).fromNow();
        }
    }
}
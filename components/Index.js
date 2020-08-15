export default {
    name: 'Index',
    template: `
        <div class="container" :class="{ 'loading': loading }">
            <div v-for="post in posts" :key="post.id">
                <h2><a :href="'/post/' + post.slug">{{ post.title }}</a></h2>
                <div class="mb-2">
                    <time :datetime="post.createdAt">{{ post.createdAt | formatDate }}</time>
                    by <b>{{ post.user.username }}</b>
                </div>
                <p class="text-justify">{{ post.text }}</p>
            </div>
            
            <nav aria-label="Page navigation example" v-if="pages.length">
                <ul class="pagination justify-content-center">
                    <li class="page-item" :class="{ 'disabled': page === 1 }">
                        <a class="page-link" @click="prevPage">Previous</a>
                    </li>
                    <li class="page-item" v-for="p in pages" :class="{ 'active': p === page }">
                        <a class="page-link" @click="gotoPage(p)">{{ p }}</a>
                    </li>
                    <li class="page-item" :class="{ 'disabled': page === pages.length  }">
                        <a class="page-link" @click="nextPage">Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    `,
    data() {
        return {
            loading: true,
            posts: [],
            page: 1,
            pages: []
        }
    },
    mounted() {
        this.getPosts();
    },
    methods: {
        getPosts() {
            this.loading = true;
            const page = this.page;
            Vue.http.get('posts/', { params: { page } }).then(response => {
                this.posts = response.data.results;
                this.pages = [];
                for (let i = 1; i <= response.data.total / 10; i++) {
                    this.pages.push(i);
                }
                this.loading = false;
            });
        },
        gotoPage(page) {
            this.page = page;
            this.getPosts();
        },
        nextPage() {
            this.page++;
            this.getPosts();
        },
        prevPage() {
            this.page--;
            this.getPosts();
        }
    },
    filters: {
        formatDate: d => {
            return moment(String(d)).fromNow();
        }
    }
}
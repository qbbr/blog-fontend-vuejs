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
                <div class="">
                    <a href="#" v-for="tag in post.tags" @click.prevent="filterByTag(tag)">{{ tag.name }}</a>
                </div>
                <p class="text-justify">{{ post.text }}</p>
            </div>
            
            <nav aria-label="Page navigation example" v-if="pages.length > 1">
                <ul class="pagination justify-content-center">
                    <li class="page-item" :class="{ 'disabled': page === 1 }">
                        <a href="#" class="page-link" @click.prevent="prevPage">Previous</a>
                    </li>
                    <li class="page-item" v-for="p in pages" :class="{ 'active': p === page }">
                        <a href="#" class="page-link" @click.prevent="gotoPage(p)">{{ p }}</a>
                    </li>
                    <li class="page-item" :class="{ 'disabled': page === pages.length  }">
                        <a href="#" class="page-link" @click.prevent="nextPage">Next</a>
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
            pages: [],
            tag: '',
            query: ''
        }
    },
    mounted() {
        this.getPosts();
        this.$root.$on('search', (data) => {
            this.query = data;
            this.getPosts();
        });
    },
    methods: {
        getPosts() {
            this.loading = true;
            const params = {
                page: this.page
            };

            if (this.tag.length) {
                params.tag = this.tag;
            }

            if (this.query.length) {
                params.query = this.query;
            }

            Vue.http.get('posts/', { params: params }).then(response => {
                this.posts = response.data.results;
                this.pages = [];
                for (let i = 1; i <= Math.ceil(response.data.total / 10); i++) {
                    this.pages.push(i);
                }
                this.loading = false;
            });
        },
        filterByTag(tag) {
            this.tag = tag.name;
            this.getPosts();
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
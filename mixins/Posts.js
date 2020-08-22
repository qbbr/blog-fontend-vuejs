import '../components/blog-post.js';

export default {
    template: `
        <div class="container" :class="{ 'loading': loading }">
            <div v-if="posts.length === 0" style="height: 400px;" class="no-content">no posts...</div>
            <div v-else>
                <div class="text-center" v-if="$route.name === 'posts' && posts.length > 1">
                    <div class="alert alert-info d-md-inline-block">
                        sort by: 
                        <router-link :to="{ name: 'posts', query: getSortParams('created') }" v-html="decorateSortName('created')" class="btn btn-link"></router-link>
                        |
                        <router-link :to="{ name: 'posts', query: getSortParams('title') }" v-html="decorateSortName('title')" class="btn btn-link"></router-link>
                    </div>
                </div>
                <template v-for="(post, index) in posts">
                    <blog-post :post="post" :isDetail="false"></blog-post>
                    <hr v-if="posts.length - 1 !== index" />
                </template>
            </div>
            <nav aria-label="posts navigation" v-if="pages.length > 1">
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
            pages: [],
            defaultSort: 'created',
            defaultOrder: 'desc'
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
        },
        sort() {
            return this.$route.query.sort || this.defaultSort;
        },
        order() {
            return this.$route.query.order || this.defaultOrder;
        }
    },
    watch: {
        page: 'getPosts',
        tag: 'getPosts',
        query: 'getPosts',
        sort: 'getPosts',
        order: 'getPosts'
    },
    methods: {
        decorateSortName(sort) {
            if (this.sort === sort) {
                return [
                    '<b>',
                        (this.order === 'desc' ? '&#8681;' : '&#8679;'), ' ', sort,
                    '</b>'
                ].join('\n');
            }

            return sort;
        },
        getSortParams(sort) {
            let params = this.getParams(1);
            params.sort = sort;
            params.order = (sort === this.sort)
                ? (this.order === 'desc' ? 'asc' : 'desc')
                : this.order;

            return params;
        },
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
            if (this.sort !== this.defaultSort || this.order !== this.defaultOrder) {
                params.sort = this.sort;
                params.order = this.order;
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
export default {
    template: `
        <div id="app" class="d-flex flex-column h-100">
            <header>
                <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
                    <div class="container-fluid">
                        <router-link :to="{ name: 'posts' }" class="navbar-brand">Blog</router-link>

                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarCollapse">
                            <ul class="navbar-nav">
                                <li class="nav-item">
                                    <router-link :to="{ name: 'tags' }" class="nav-link">Tags</router-link>
                                </li>
                            </ul>
                            <form class="d-flex ms-md-3" @submit.stop.prevent="search">
                                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" v-model="query">
                                <button class="btn btn-outline-secondary me-2" type="button" v-if="query.length" @click.prevent="clearQuery">&times;</button>
                                <button class="btn btn-outline-light" type="submit">Search</button>
                            </form>
                            <ul class="navbar-nav ms-auto">
                                <li class="nav-item" v-if="!isLoggedIn">
                                    <router-link :to="{ name: 'login' }" class="nav-link" >Login</router-link>
                                </li>
                                <li class="nav-item" v-if="!isLoggedIn">
                                    <router-link :to="{ name: 'register' }" class="nav-link">Register</router-link>
                                </li>
                                <li class="nav-item me-1" v-if="isLoggedIn">
                                    <router-link :to="{ name: 'new_post' }" class="btn btn-outline-success my-2 my-md-0">&plus; new post</router-link>
                                </li>
                                <li class="nav-item" v-if="isLoggedIn">
                                    <router-link :to="{ name: 'user_posts' }" class="nav-link text-light">My posts</router-link>
                                </li>
                                <li class="nav-item" v-if="isLoggedIn">
                                    <router-link :to="{ name: 'profile' }" class="nav-link text-light">Profile</router-link>
                                </li>
                                <li class="nav-item" v-if="isLoggedIn">
                                    <a href="#" @click.prevent="logout" class="nav-link">Logout</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            <main class="flex-shrink-0" role="main">
                <div class="container my-4">
                    <router-view />
                </div>
            </main>
            <footer class="footer mt-auto py-3">
                <div class="container text-center">
                    <small class="text-muted">&copy; {{ nowYear }} <a href="https://qbbr.io/" class="text-muted">qbbr</a></small>
                </div>
            </footer>
        </div>
    `,
    data() {
        return {
            query: '',
            nowYear: (new Date()).getFullYear()
        }
    },
    computed: {
        isLoggedIn() {
            return this.$store.state.user !== null;
        }
    },
    mounted() {
        if (this.$route.query.query) {
            this.query = this.$route.query.query;
        }
    },
    methods: {
        search() {
            const params = {};
            if (this.query.length) {
                params.query = this.query;
            }
            this.$router.push({ name: 'posts', query: params });
        },
        clearQuery() {
            this.query = '';
            this.search();
        },
        logout() {
            this.$store.dispatch('logout').then(() => {
                this.$router.push({ name: 'posts' });
            })
        }
    }
};

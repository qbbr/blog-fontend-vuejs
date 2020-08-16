export default {
    template: `
        <div id="app" class="d-flex flex-column h-100">
            <header>
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                    <router-link :to="{ name: 'index' }" class="navbar-brand">Blog</router-link>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <ul class="navbar-nav">
                        <li class="nav-item mr-3">
                            <router-link :to="{ name: 'tag' }" class="nav-link">Tags</router-link>
                        </li>
                    </ul>
                    
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <form class="form-inline mt-2 mt-lg-0" @submit.prevent="search">
                            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" v-model="query">
                            <button class="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
                        </form>
                        <ul class="navbar-nav ml-auto navbar-right">
                            <li class="nav-item" v-if="!isLoggedIn">
                                <router-link :to="{ name: 'login' }" class="nav-link">Login</router-link>
                            </li>
                            <li class="nav-item" v-if="!isLoggedIn">
                                <router-link :to="{ name: 'register' }" class="nav-link">Register</router-link>
                            </li>
                            <li class="nax-item" v-if="isLoggedIn">
                                <router-link :to="{ name: 'profile' }" class="nav-link">Profile</router-link>
                            </li>
                            <li class="nax-item" v-if="isLoggedIn">
                                <a href="#" @click.prevent="logout" class="nav-link">Logout</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
            
            <main class="flex-shrink-0" role="main">
                <div class="container mt-4">
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
            return this.$store.state.isAuth;
        }
    },
    methods: {
        search() {
            const params = {};
            if (this.query.length) {
                params.query = this.query;
            }
            this.$router.push({ name: 'index', query: params });
        },
        logout() {
            this.$store.dispatch('logout').then(() => {
                this.$router.push({ name: 'index' });
            })
        }
    }
};
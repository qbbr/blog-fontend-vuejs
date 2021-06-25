export default {
    name: 'Profile',
    template: `
        <div class="card bg-light mx-auto" style="max-width: 30rem;" :class="{ 'loading': loading }">
            <div class="card-header">Profile</div>
            <div class="card-body">
                <form @submit.prevent="update">
                    <div class="mb-3">
                        <label for="username" class="form-label">Username</label>
                        <input type="text" id="username" class="form-control" v-model="username" readonly>
                    </div>
                    <div class="mb-3">
                        <label for="token" class="form-label">Token</label>
                        <input type="text" id="token" class="form-control" v-model="token" readonly>
                    </div>
                    <div class="mb-3">
                        <label for="about" class="form-label">About</label>
                        <textarea id="about" class="form-control" v-model="about"></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="createdAt" class="form-label">Created at</label>
                        <input type="text" id="createdAt" class="form-control" v-model="createdAt" readonly>
                    </div>
                    <div class="mb-3">
                        Posts: <span>{{ postsCount }}</span>
                    </div>
                    <button type="submit" class="btn btn-primary w-100">Update profile</button>
                    <button type="button" @click.prevent="removeAllPosts" class="btn btn-link text-danger w-100">Remove all posts</button>
                    <button type="button" @click.prevent="removeUser" class="btn btn-link text-danger w-100">Remove user</button>
                </form>
            </div>
        </div>
    `,
    data() {
        return {
            loading: true,
            username: '',
            token: this.$store.state.user !== null ? this.$store.state.user.token : '',
            about: '',
            createdAt: '',
            postsCount: 0
        }
    },
    mounted() {
        this.get();
    },
    methods: {
        get() {
            this.loading = true;
            Vue.http.get('user/profile/').then(response => {
                this.username = response.data.username;
                this.about = response.data.about;
                this.createdAt = response.data.createdAt;
                this.postsCount = response.data.postsCount;
                this.loading = false;
            });
        },
        update() {
            const { about } = this;
            this.loading = true;
            Vue.http.put('user/profile/', { about }).then(() => {
                this.loading = false;
            });
        },
        removeAllPosts() {
            this.loading = true;
            bootbox.confirm('Remove all posts?', result => {
                if (result) {
                    Vue.http.delete('user/posts/').then(() => {
                        this.get();
                        this.loading = false;
                    });
                } else {
                    this.loading = false;
                }
            });
        },
        removeUser() {
            this.loading = true;
            bootbox.confirm('Remove user with all userdata?', result => {
                if (result) {
                    Vue.http.delete('user/profile/').then(() => {
                        this.$store.dispatch('logout').then(() => {
                            this.$router.push({ name: 'posts' });
                            this.loading = false;
                        });
                    });
                } else {
                    this.loading = false;
                }
            });
        }
    }
};

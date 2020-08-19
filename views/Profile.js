export default {
    name: 'Profile',
    template: `
        <div class="card bg-light mx-auto" style="max-width: 30rem;" :class="{ 'loading': loading }">
            <div class="card-header">Profile</div>
            <div class="card-body">
                <form @submit.prevent="update">
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input type="text" id="username" class="form-control" v-model="username" readonly>
                    </div>
                    <div class="form-group">
                        <label for="token">Token</label>
                        <input type="text" id="token" class="form-control" v-model="token" readonly>
                    </div>
                    <div class="form-group">
                        <label for="about">About</label>
                        <textarea id="about" class="form-control" v-model="about"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="createdAt">Created at</label>
                        <input type="text" id="createdAt" class="form-control" v-model="createdAt" readonly>
                    </div>
                    <div class="form-group">
                        Posts: <span>{{ postsCount }}</span>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">Update profile</button>
                    <button type="button" @click.prevent="removeAllPosts" class="btn btn-link text-danger btn-block">Remove all posts</button>
                    <button type="button" @click.prevent="removeUser" class="btn btn-link text-danger btn-block">Remove user</button>
                </form>
            </div>
        </div>
    `,
    data() {
        return {
            loading: true,
            username: '',
            token: this.$store.state.isAuth ? this.$store.state.user.token : '',
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
            Vue.http.get('private/user/').then(response => {
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
            Vue.http.put('private/user/', { about }).then(() => {
                this.loading = false;
            });
        },
        removeAllPosts() {
            this.loading = true;
            if (confirm('Remove all posts?')) {
                Vue.http.delete('private/user/posts/').then(() => {
                    this.get();
                    this.loading = false;
                });
            } else {
                this.loading = false;
            }
        },
        removeUser() {
            this.loading = true;
            if (confirm('Remove user with all userdata?')) {
                Vue.http.delete('private/user/').then(() => {
                    this.$store.dispatch('logout').then(() => {
                        this.$router.push({ name: 'posts' });
                        this.loading = false;
                    });
                });
            } else {
                this.loading = false;
            }
        }
    }
};
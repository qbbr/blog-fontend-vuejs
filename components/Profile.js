export default {
    name: 'Profile',
    template: `
        <div class="card bg-light mx-auto" style="max-width: 30rem;" :class="{ 'loading': loading }">
            <div class="card-header">Profile</div>
            <div class="card-body">
                <form @submit.prevent="update">
                    <div class="form-group">
                        <label for="username" class="sr-only">Username</label>
                        <input type="text" id="username" class="form-control" v-model="username" readonly>
                    </div>
                    <div class="form-group">
                        <label for="token" class="sr-only">Token</label>
                        <input type="text" id="token" class="form-control" v-model="token" readonly>
                    </div>
                    <div class="form-group">
                        <label for="about" class="sr-only">About</label>
                        <textarea id="about" class="form-control" v-model="about"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="createdAt" class="sr-only">Created at</label>
                        <input type="text" id="createdAt" class="form-control" v-model="createdAt" readonly>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">Update</button>
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
            createdAt: ''
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
                this.loading = false;
            });
        },
        update() {
            const { about } = this;
            this.loading = true;
            Vue.http.put('private/user/', { about }).then(() => {
                this.loading = false;
            });
        }
    }
};
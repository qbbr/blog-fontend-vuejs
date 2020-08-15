export default {
    template: `
        <div class="auth">
            <h4 class="mb-4">Login</h4>
            <form @submit.prevent="login" :class="{ 'loading': loading }">
                <div class="form-group">
                    <label for="username" class="sr-only">Username</label>
                    <input type="text" id="username" class="form-control" v-model="username" placeholder="username" required>
                </div>
                
                <div class="form-group">
                    <label for="password" class="sr-only">Password</label>
                    <input type="password" id="password" class="form-control" v-model="password" placeholder="password" required>
                </div>
                
                <button type="submit" class="btn btn-primary btn-block">Login</button>
            </form>
        </div>
    `,
    name: 'Login',
    data() {
        return {
            loading: false,
            username: 'user1',
            password: 'password'
        }
    },
    methods: {
        login() {
            this.loading = true;
            let username = this.username;
            let password = this.password;
            this.$store.dispatch('login', { username, password }).then(() => {
                this.$router.push({ name: 'index' });
                this.loading = false;
            }).catch(err => {
                console.log(err);
                this.loading = false;
            })
        }
    }
};
export default {
    template: `
        <div class="auth">
            <h4 class="mb-4">Register</h4>
            <form @submit.prevent="register" :class="{ 'loading': loading }">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" class="form-control" v-model="username" required>
                </div>
                
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" class="form-control" v-model="password" required>
                </div>
                
                <div class="form-group">
                    <label for="password-confirmation">Configrm password</label>
                    <input type="password" id="password-confirmation" class="form-control" v-model="passwordConfirmation" required>
                </div>
                
                <button type="submit" class="btn btn-primary">Register</button>
            </form>
        </div>
    `,
    name: 'Register',
    data() {
        return {
            loading: false,
            username: '',
            password: '',
            passwordConfirmation: ''
        }
    },
    methods: {
        register() {
            this.loading = true;
            let username = this.username;
            let password = this.password;
            this.$store.dispatch('register', { username, password }).then(() => {
                this.$router.push({ name: 'index' });
                this.loading = false;
            }).catch(err => {
                this.loading = false;
                console.log(err);
            });
        }
    }
};
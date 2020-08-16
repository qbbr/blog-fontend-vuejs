export default {
    name: 'Register',
    template: `
        <div class="card bg-light mx-auto" style="max-width: 20rem;" :class="{ 'loading': loading }">
            <div class="card-header">Register</div>
            <div class="card-body">
                <form @submit.prevent="register">
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input type="text" id="username" class="form-control" :class="{ 'is-invalid': errors.username }" v-model="username" required>
                        <div v-if="errors.username" class="invalid-feedback">
                            <ul class="pl-3">
                                <li v-for="error in errors.username">{{ error }}</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" class="form-control" :class="{ 'is-invalid': errors.password }" v-model="password" required>
                        <div v-if="errors.password" class="invalid-feedback">
                            <ul class="pl-3">
                                <li v-for="error in errors.password">{{ error }}</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="password-confirmation">Confirm password</label>
                        <input type="password" id="password-confirmation" class="form-control" v-model="passwordConfirmation" ref="passwordConfirmationElm" required>
                    </div>
                    
                    <button type="submit" class="btn btn-primary">Register</button>
                </form>
            </div>
        </div>
    `,
    data() {
        return {
            loading: false,
            username: '',
            password: '',
            passwordConfirmation: '',
            errors: {}
        }
    },
    watch: {
        passwordConfirmation: 'checkPasswordsEqual',
        password: 'checkPasswordsEqual',
    },
    methods: {
        checkPasswordsEqual() {
            const { password, passwordConfirmation } = this;
            const { passwordConfirmationElm } = this.$refs;
            if (passwordConfirmation !== password) {
                passwordConfirmationElm.setCustomValidity('Password not confirmed.');
            } else {
                passwordConfirmationElm.setCustomValidity('');
            }
        },
        register() {
            const { username, password } = this;
            this.loading = true;
            this.$store.dispatch('register', { username, password }).then(() => {
                this.$router.push({ name: 'index' });
                this.loading = false;
            }).catch(response => {
                if (422 === response.status) { // validation error
                    this.errors = response.data.errors;
                }
                this.loading = false;
            });
        }
    }
};
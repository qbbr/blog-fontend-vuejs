export default {
    name: 'NewPost',
    template: `
        <div class="card bg-light mx-auto" style="max-width: 30rem;" :class="{ 'loading': loading }">
            <div class="card-header">New post</div>
            <div class="card-body">
                <form @submit.prevent="create">
                    <div class="form-group">
                        <label for="title" class="sr-only">Title</label>
                        <input type="text" id="title" class="form-control" :class="{ 'is-invalid': errors.title }" v-model="title" placeholder="title" required>
                        <div v-if="errors.title" class="invalid-feedback">
                            <ul class="pl-3">
                                <li v-for="error in errors.title">{{ error }}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="text" class="sr-only">Text</label>
                        <textarea id="text" class="form-control" v-model="text" :class="{ 'is-invalid': errors.text }" placeholder="text"></textarea>
                        <div v-if="errors.text" class="invalid-feedback">
                            <ul class="pl-3">
                                <li v-for="error in errors.text">{{ error }}</li>
                            </ul>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">Create</button>
                </form>
            </div>
        </div>
    `,
    data() {
        return {
            loading: false,
            title: '',
            text: '',
            errors: {}
        }
    },
    methods: {
        create() {
            const { title, text } = this;
            this.loading = true;
            Vue.http.post('private/user/post/', { title, text }).then(() => {
                this.$router.push({ name: 'posts' });
                this.loading = false;
            }, response => {
                if (422 === response.status) { // validation error
                    this.errors = response.data.errors;
                }
                this.loading = false;
            });
        }
    }
};
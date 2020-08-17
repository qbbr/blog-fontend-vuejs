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
                        <textarea id="text" class="form-control" v-model="text" :class="{ 'is-invalid': errors.text }" placeholder="text" required></textarea>
                        <div v-if="errors.text" class="invalid-feedback">
                            <ul class="pl-3">
                                <li v-for="error in errors.text">{{ error }}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="tags" class="sr-only">Tags</label>
                        <input type="text" id="tags" class="form-control" v-model="tagsAsString" placeholder="tags">
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
            tags: [],
            tagsAsString: '',
            errors: {}
        }
    },
    watch: {
        tagsAsString() {
            this.tags = [];
            const uniqueCheck = {};
            this.tagsAsString.split(',').forEach(value => {
                const name = value.trim();
                if (0 !== name.length && !uniqueCheck.hasOwnProperty(name)) {
                    this.tags.push({ name });
                }
                uniqueCheck[name] = true;
            });
            this.saveDraft();
        },
        title: 'saveDraft',
        text: 'saveDraft'
    },
    mounted() {
        this.loadDraft();
    },
    methods: {
        saveDraft() {
            const { title, text, tagsAsString } = this;
            localStorage.setItem('post_draft', JSON.stringify({ title, text, tagsAsString }));
        },
        loadDraft() {
            const draft = JSON.parse(localStorage.getItem('post_draft'));
            if (null !== draft) {
                if (draft.title) {
                    this.title = draft.title;
                }
                if (draft.text) {
                    this.text = draft.text;
                }
                if (draft.tagsAsString) {
                    this.tagsAsString = draft.tagsAsString;
                }
            }
        },
        clearDraft() {
            localStorage.removeItem('post_draft');
        },
        create() {
            const { title, text, tags } = this;
            this.loading = true;
            Vue.http.post('private/user/post/', { title, text, tags }).then(() => {
                this.clearDraft();
                this.loading = false;
                this.$router.push({ name: 'posts' });
            }, response => {
                if (422 === response.status) { // validation error
                    this.errors = response.data.errors;
                    this.loading = false;
                }
            });
        }
    }
};
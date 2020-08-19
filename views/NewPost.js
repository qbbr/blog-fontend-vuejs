import PostForm from '../mixins/PostForm.js';

export default {
    name: 'NewPost',
    mixins: [PostForm],
    data() {
        return {
            formTitle: 'New post',
            formSubmitBtnText: 'Create'
        };
    },
    watch: {
        title: 'saveDraft',
        text: 'saveDraft',
        tags: 'saveDraft'
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
        submit() {
            const { title, text, tags, isPrivate } = this;
            this.loading = true;
            Vue.http.post('private/user/post/', { title, text, tags, isPrivate }).then(() => {
                this.clearDraft();
                this.loading = false;
                this.$router.push({ name: 'user_posts' });
            }, response => {
                if (422 === response.status) { // validation error
                    this.errors = response.data.errors;
                    this.loading = false;
                }
            });
        }
    }
};
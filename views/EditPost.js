import PostForm from '../mixins/PostForm.js';

export default {
    name: 'EditPost',
    mixins: [PostForm],
    data() {
        return {
            loading: true,
            formTitle: 'Edit post',
            formSubmitBtnText: 'Update'
        };
    },
    computed: {
        id() {
            return this.$route.params.id;
        }
    },
    mounted() {
        this.get();
    },
    methods: {
        get() {
            Vue.http.get('private/user/post/' + this.id + '/').then(response => {
                this.title = response.data.title;
                this.text = response.data.text;
                let tags = [];
                response.data.tags.forEach(item => {
                    tags.push(item.name);
                });
                this.tagsAsString = tags.join(', ');
                this.loading = false;
            }, response => {
                if (422 === response.status) { // validation error
                    this.errors = response.data.errors;
                    this.loading = false;
                }
            });
        },
        submit() {
            const { title, text, tags, isPrivate } = this;
            this.loading = true;
            Vue.http.put('private/user/post/' + this.id + '/', { title, text, tags, isPrivate }).then(() => {
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
Vue.component('blog-post', {
    props: ['post', 'isDetail'],
    template: `
        <div>
            <h2><router-link :to="{ name: 'post', params: { slug: post.slug } }" v-html="highlight(post.title)"></router-link></h2>
            <div class="mb-2">
                <time :datetime="post.createdAt">{{ post.createdAt | formatDate }}</time>
                by <b>{{ post.user.username }}</b>
            </div>
            <div v-if="username === post.user.username">
                <button class="btn btn-warning" title="edit post" @click.prevent="edit(post.id)">✏</button>
                <button class="btn btn-danger" title="delete post" @click.prevent="remove(post.id)">❌️</button>
            </div>
            <div class="mb-2" v-if="post.tags.length">
                <router-link :to="{ name: 'posts', query: { tag: tag.name } }" v-for="tag in post.tags" :key="tag.name" class="mr-1">{{ tag.name }}</router-link>
            </div>
            <p v-if="isDetail" class="text-justify" v-html="post.text"></p>
        </div>
    `,
    data() {
        return {
            username: this.$store.state.user ? this.$store.state.user.username : ''
        }
    },
    methods: {
        highlight(title) {
            let query = this.$route.query.query || '';
            if (query.length) {
                query.split(' ').forEach(value => {
                    title = title.replace(new RegExp(value.trim(), 'gi'), str => {
                        return '<b>' + str + '</b>';
                    });
                });
            }

            return title;
        },
        edit(id) {
            this.$router.push({ name: 'edit_post', params: { id: id } });
        },
        remove(id) {
            if (confirm('A u sure?')) {
                Vue.http.delete('private/user/post/' + id + '/').then(response => {
                    if (204 === response.status) { // no content
                        this.$root.$emit('post.removed', id);
                    }
                });
            }
        }
    }
});
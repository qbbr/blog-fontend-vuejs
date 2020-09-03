export default {
    name: 'Tag',
    template: `
        <div class="container" :class="{ 'loading': loading }">
            <div v-if="tags.length === 0" style="height: 400px;" class="no-content">no tags...</div>
            <div v-else>
                <h3>Tags</h3>
                <router-link :to="{ name: 'posts', query: { tag: tag.name } }" v-for="tag in tags" :key="tag.name" class="btn btn-info m-1">
                    {{ tag.name }}
                    <span class="badge badge-light">{{ tag.postsCount }}</span>
                </router-link>
            </div>
        </div>
    `,
    data() {
        return {
            loading: true,
            tags: []
        }
    },
    mounted() {
        this.getTags();
    },
    methods: {
        getTags() {
            this.loading = true;
            Vue.http.get('tags/').then(response => {
                this.tags = response.data
                    .filter(tag => tag.postsCount > 0)
                    .sort((a, b) => b.postsCount - a.postsCount);
                this.loading = false;
            });
        }
    }
};

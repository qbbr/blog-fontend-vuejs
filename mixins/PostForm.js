export default {
    template: `
        <div class="card bg-light mx-auto" style="max-width: 40rem;" :class="{ 'loading': loading }">
            <div class="card-header">{{ formTitle }}</div>
            <div class="card-body">
                <form @submit.prevent="submit">
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
                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <a class="nav-link active" id="markdown-tab" data-toggle="tab" href="#markdown" role="tab">Markdown</a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="nav-link" id="html-tab" data-toggle="tab" href="#html" role="tab" @click="preview">Preview</a>
                            </li>
                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane active" id="markdown" role="tabpanel">
                                <textarea id="text" class="form-control border-top-0 rounded-top-0" style="height: 300px;" v-model="text" :class="{ 'is-invalid': errors.text }" placeholder="text" required></textarea>
                            </div>
                            <div class="tab-pane border-right border-bottom border-left rounded-bottom p-2" id="html" role="tabpanel" v-html="html" style="height: 300px;"></div>
                        </div>
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
                    <div class="form-group">
                        <div class="custom-control custom-switch">
                            <input type="checkbox" class="custom-control-input" id="isPrivate" v-model="isPrivate">
                            <label class="custom-control-label" for="isPrivate">private post</label>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">{{ formSubmitBtnText }}</button>
                </form>
            </div>
        </div>
    `,
    data() {
        return {
            loading: false,
            formTitle: '',
            title: '',
            text: '',
            tags: [],
            tagsAsString: '',
            isPrivate: false,
            errors: {},
            html: ''
        }
    },
    watch: {
        tagsAsString() {
            this.tags = [];
            const uniqueCheck = {};
            let tags = [];
            this.tagsAsString.split(',').forEach(value => {
                const name = value.trim();
                if (0 !== name.length && !uniqueCheck.hasOwnProperty(name)) {
                    tags.push({ name });
                }
                uniqueCheck[name] = true;
            });
            this.tags = tags;
        }
    },
    methods: {
        preview() {
            const { text } = this;
            this.html = 'loading...';
            Vue.http.post('user/post/md2html/', { text }).then(response => {
                this.html = response.data.html;
                this.previewLoading = false;
            });
        }
    }
};

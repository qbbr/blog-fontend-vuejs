export default {
    template: `
        <div class="card bg-light mx-auto" style="max-width: 30rem;" :class="{ 'loading': loading }">
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
            errors: {},
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
}

Vue.component('form-field-errors', {
    props: ['errors'],
    template: `
        <div v-if="errors" class="invalid-feedback">
            <ul class="pl-3">
                <li v-for="error in errors">{{ error }}</li>
            </ul>
        </div>
    `
});

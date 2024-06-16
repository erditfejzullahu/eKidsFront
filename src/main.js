import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store/store.js'
import './assets/css/tailwind.css'
import 'swiper/swiper-bundle.css';
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate';
import * as rules from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';
import CKEditor from '@ckeditor/ckeditor5-vue';

//createApp(App).use(store).use(router).mount('#app')

Object.keys(rules).forEach(rule => {
    defineRule(rule, rules[rule]);
});


configure({
    generateMessage: localize('en', {
        messages: {
            required: 'This field is required',
            min: `This field must have at least 6 characters`,
            // Add more custom messages here
        }
    }),
    validateOnInput: true, // Validate on input rather than change
});

const app = createApp(App);
app.component('ErrorMessage', ErrorMessage);
app.component('Field', Field);
app.component('Form', Form);
app.use(store);
app.use(router);
app.use(CKEditor);




// store.dispatch('loadStoredTokens');

app.mount('#app');
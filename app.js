import App from './components/App.js';
import { router } from './router.js';
import store from './store.js';

// Vue.config.productionTip = false;
Vue.http.options.root = 'http://127.0.0.1:8001/';

Vue.http.interceptors.push((request, next) => {
    next((response) => {
        if (response.status === 401) {
            router.push({ name: 'login' });
            store.dispatch('logout');
        }
        return response
    })
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
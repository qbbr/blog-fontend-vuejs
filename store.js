const user = JSON.parse(localStorage.getItem('user'));
const state = user
    ? { isAuth: true, user: user }
    : { isAuth: false, user: null };

if (user) {
    Vue.http.headers.common['Authorization'] = 'Bearer ' + user.token;
}

export default new Vuex.Store({
    state: state,
    mutations: {
        auth_success(state, user) {
            state.isAuth = true;
            state.user = user;
            localStorage.setItem('user', JSON.stringify(user));
            Vue.http.headers.common['Authorization'] = 'Bearer ' + user.token;
        },
        auth_error(state) {
            state.isAuth = false;
            state.user = null;
            localStorage.removeItem('user');
            delete Vue.http.headers.common['Authorization'];
        },
        auth_logout(state) {
            state.isAuth = false;
            state.user = null;
            localStorage.removeItem('user');
            delete Vue.http.headers.common['Authorization'];
        },
    },
    actions: {
        register({ commit }, user) {
            return new Promise((resolve, reject) => {
                Vue.http.post('register/', user).then(response => {
                    user.token = response.data.token;
                    commit('auth_success', user);
                    resolve(response);
                }, response => {
                    commit('auth_error', response);
                    reject(response);
                });
            });
        },
        login({ commit }, user) {
            return new Promise((resolve, reject) => {
                Vue.http.post('login/', user).then(response => {
                    user.token = response.data.token;
                    commit('auth_success', user)
                    resolve(response);
                }, response => {
                    commit('auth_error');
                    reject(response);
                });
            });
        },
        logout({ commit }) {
            commit('auth_logout');
        }
    },
    getters: {}
})
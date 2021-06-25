const USER_KEY = 'user';

function getUser() {
    const user = localStorage.getItem(USER_KEY);

    if (user) {
        return JSON.parse(user);
    }

    return null;
}

const user = getUser();

if (user && user.token) {
    Vue.http.headers.common['Authorization'] = 'Bearer ' + user.token;
}

export default new Vuex.Store({
    state: { user },
    mutations: {
        auth_success(state, user) {
            delete user.password;
            state.user = user;
            localStorage.setItem(USER_KEY, JSON.stringify(user));
            Vue.http.headers.common['Authorization'] = 'Bearer ' + user.token;
        },
        auth_error(state) {
            state.user = null;
            localStorage.removeItem(USER_KEY);
            delete Vue.http.headers.common['Authorization'];
        },
        auth_logout(state) {
            state.user = null;
            localStorage.clear();
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

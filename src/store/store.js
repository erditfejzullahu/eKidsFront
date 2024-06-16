import { createStore } from 'vuex'; 
//import createPersistedState from 'vuex-persistedstate';
import { TokenExpired, checkAccessToken, checkRefreshToken} from '@/utils/auth';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import axiosInstance from '@/api/axios';

axios.defaults.baseURL = 'https://localhost:7051/';
axiosInstance.defaults.baseURL = 'https://localhost:7051/';
//axios.defaults.headers.post['Content-Type'] = 'application/json';
//axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

// Vue.use(Vuex);

export default new createStore({
    state: {
        userCatData: null,
        isExpired: TokenExpired(),
        existToken: checkAccessToken(),
        accessToken: checkAccessToken(),
        refreshToken: checkRefreshToken(),
        errorMessage: null,
    },
    mutations: {
        setAuth(state, {accessToken, refreshToken, userData}) {
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            state.isExpired = TokenExpired();
            state.existToken = checkAccessToken();
        },
        clearAuth(state) {
            state.userCatData = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.isExpired = true;
            state.existToken = false;
        },
        setUserCat(state, userCatData) {
            state.userCatData = userCatData;
        }
    },
    actions: {
        async login({commit}, {username, password}) {
            try {
                const response = await axios.post('/login', { 'username': username, 'password': password }, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                console.log(response.data)
                //console.log(response);
                const {accessToken, refreshToken} = response.data.token;
                //console.log({accessToken, refreshToken});
                commit('setAuth', {accessToken, refreshToken});

                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                await this.dispatch('loadStoredTokens');
                await this.dispatch('fetchUserData');
            } catch(error) {
                console.error(error);
                throw error.response?.data?.message || 'Login failed. Please try again.';
            }
        },
        async fetchUserData({commit, state}) {
            try{
                const decodedToken = jwtDecode(state.accessToken);
                const userID = decodedToken.sub;
                const response = await axiosInstance.get(`/api/Users/info/${userID}`, {
                    headers: {
                        Authorization: `Bearer ${state.accessToken}`
                    }
                });
                console.log(response.data.data);
                commit('setUserCat', response.data.data);
            }catch(error){
                console.error("error getting data", error);
            }
        },
        async logout({commit}) {
            commit('clearAuth');
            await this.dispatch('removeStoredTokens');
        },
        async refresh({commit}) {
            try {
                const response = await axios.post('/api/Users/refresh', {'token': this.state.refreshToken});
                const {accessToken, refreshToken} = response.data;
                commit('setAuth', {accessToken, refreshToken});
                
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                await this.dispatch('loadStoredTokens');
                await this.dispatch('fetchUserData');
            }catch(error){
                console.error('error getting refershToken', error);
                await this.dispatch('logout');
            }
        },
        async loadStoredTokens({commit}) {
            const accessToken = localStorage.getItem('accessToken')
            const refreshToken = localStorage.getItem('refreshToken');
            if (accessToken && refreshToken) {
                commit('setAuth', {accessToken, refreshToken});
            }
        },
        async removeStoredTokens() { 
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        }
    },
    getters: {
        accessToken: state => state.accessToken,
        refreshToken: state => state.refreshToken
    },
    // plugins: [createPersistedState({
    //     paths: ['userData']
    // })]
})
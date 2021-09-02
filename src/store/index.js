import { createStore } from 'vuex';
import axios from 'axios';

let timer;

export default createStore({
    state() {
        return {
            allActivities: [],
            userId: null,
            token: null,
            email: null,
        };
    },
    mutations: {
        setUser(state, payload) {
            state.token = payload.token;
            state.userId = payload.userId;
            state.email = payload.email;
        },
    },
    actions: {
        async signup(context, payload) {
            return context.dispatch('auth', {
                ...payload,
                mode: 'signup',
            });
        },
        async login(context, payload) {
            return context.dispatch('auth', {
                ...payload,
                mode: 'login',
            });
        },
        async auth(context, payload) {
            let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDPyIyYCXRd0SWyZP9ieFhSEhJFFrodTIw`;

            if (payload.mode === 'signup') {
                url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDPyIyYCXRd0SWyZP9ieFhSEhJFFrodTIw`;
            }
            const response = await axios.post(url, {
                email: payload.email,
                password: payload.password,
                returnSecureToken: true,
            });
            const data = response.data;
            if (response.status !== 200) {
                const error = new Error(
                    response.statusText || 'Failed to authenticate'
                );
                throw error;
            }
            const expiresIn = +data.expiresIn * 1000;

            const expirationDate = new Date().getTime() + expiresIn;

            localStorage.setItem('token', data.idToken);
            localStorage.setItem('userId', data.localId);
            localStorage.setItem('email', data.email);
            localStorage.setItem('expirationDate', expirationDate);

            timer = setTimeout(() => {
                context.dispatch('logout');
            }, expiresIn);
            context.commit('setUser', {
                token: data.idToken,
                userId: data.localId,
                email: data.email,
            });
        },
        tryLogin(context) {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            const email = localStorage.getItem('email');
            const tokenExpiration = localStorage.getItem('expirationDate');

            const expiresIn = +tokenExpiration - new Date().getTime();

            if (expiresIn < 0) {
                return;
            }

            if (token && userId && email) {
                context.commit('setUser', {
                    token,
                    userId,
                    email,
                });
            }
        },
        logout(context) {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('email');
            localStorage.removeItem('expirationDate');

            clearTimeout(timer);

            context.commit('setUser', {
                token: null,
                userId: null,
                email: null,
            });
        },
    },
    getters: {
        userId(state) {
            return state.userId;
        },
        isAuthenticated(state) {
            return !!state.token;
        },
        getEmail(state) {
            return state.email;
        },
    },
});

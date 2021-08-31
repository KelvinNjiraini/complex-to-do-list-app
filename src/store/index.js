import { createStore } from 'vuex';
import axios from 'axios';
// const baseUrl = `https://complex-to-do-default-rtdb.firebaseio.com/`;

export default createStore({
    state() {
        return {
            allActivities: [],
            userId: null,
            token: null,
            tokenExpiration: null,
        };
    },
    mutations: {
        setUser(state, payload) {
            state.token = payload.token;
            state.userId = payload.userId;
            state.tokenExpiration = payload.tokenExpiration;
        },
    },
    actions: {
        async signup(context, payload) {
            const response = await axios.post(
                `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDPyIyYCXRd0SWyZP9ieFhSEhJFFrodTIw`,
                {
                    email: payload.email,
                    password: payload.password,
                    returnSecureToken: true,
                }
            );
            console.log(response);
            const data = response.data;
            if (response.status !== 200) {
                console.log(data);
                const error = new Error(
                    response.statusText || 'Failed to authenticate'
                );
                throw error;
            }
            context.commit('setUser', {
                token: data.idToken,
                userId: data.localId,
                tokenExpiration: data.expiresIn,
            });
        },
    },
    getters: {
        userId(state) {
            return state.userId;
        },
    },
});

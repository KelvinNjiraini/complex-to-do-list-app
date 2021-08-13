import { createStore } from 'vuex';

export default createStore({
    state() {
        return {
            allActivities: [],
        };
    },
    mutations: {
        addActivity(state, payload) {
            state.allActivities.push(payload);
        },
    },
    actions: {
        addActivity(context, payload) {
            context.commit('addActivity', payload);
        },
    },
    getters: {
        hasActivities(state) {
            return state.allActivities.length > 0;
        },
        allActivities(state) {
            return state.allActivities;
        },
    },
});

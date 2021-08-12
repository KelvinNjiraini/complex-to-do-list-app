import { createStore } from 'vuex';

export default createStore({
    state: {
        allActivities: [],
    },
    mutations: {
        pushActivity(state, payload) {
            state.allActivities.push(payload);
        },
    },
    actions: {
        addActivity(context, payload) {
            context.commit('pushActivity', payload);
        },
    },
    getters: {
        allActivities(state) {
            return state.allActivities;
        },
    },
});

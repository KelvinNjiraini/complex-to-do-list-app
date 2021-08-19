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
        deleteActivity(state, payload) {
            state.allActivities = state.allActivities.filter(
                (activity) => activity.id !== payload
            );
        },
        updateActivity(state, payload1, payload2) {
            const oldActivityIndex = state.allActivities.findIndex(
                (activity) => {
                    return (activity.id = payload1.id);
                }
            );
            state.allActivities[oldActivityIndex].val = payload2.val;
        },
    },
    actions: {
        addActivity(context, payload) {
            context.commit('addActivity', payload);
        },
        deleteActivity(context, payload) {
            context.commit('deleteActivity', payload);
        },
        updateActivity(context, payload1, payload2) {
            context.commit('updateActivity', payload1, payload2);
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

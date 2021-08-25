import { createStore } from 'vuex';

// import { db } from './../firebaseConfig';
import axios from 'axios';
const baseUrl = `https://complex-to-do-default-rtdb.firebaseio.com/`;

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
            state.allActivities.splice(payload, 1);
        },
        editActivity(state, payload) {
            state.allActivities[payload.index] = payload.newActivity;
        },
        loadAllActivities(state, payload) {
            state.allActivities = payload;
        },
    },
    actions: {
        addActivity(context, payload) {
            context.commit('addActivity', payload);
        },
        deleteActivity(context, payload) {
            context.commit('deleteActivity', payload);
        },
        editActivity(context, payload) {
            context.commit('editActivity', payload);
        },
        async loadAllActivities(context) {
            const response = await axios.get(baseUrl + 'activities.json');
            const loadedActivities = [];
            for (const [id, activity] of Object.entries(response.data)) {
                const loadedAct = {
                    id,
                    activity,
                };
                loadedActivities.push(loadedAct);
            }
            context.commit('loadAllActivities', loadedActivities);
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

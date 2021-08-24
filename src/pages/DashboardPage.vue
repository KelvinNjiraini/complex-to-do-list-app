<template>
    <div>
        <base-dialog fixed :show="isEditting" title="Edit your activity">
            <div class="input-group">
                <input type="text" v-model.trim="activity" />
                <base-button @click="saveEdit">Save</base-button>
                <base-button @click="cancelEdit">Cancel</base-button>
            </div>
        </base-dialog>
        <base-card>
            <h3>My Dashboard</h3>
            <section>
                <form @submit.prevent="addActivity">
                    <div class="input-group">
                        <label for="activity">Activity</label>
                        <input type="text" v-model.trim="activity" />
                        <p v-if="error">{{ errorMessage }}</p>
                    </div>
                    <base-button>Add</base-button>
                </form>
            </section>
        </base-card>
        <base-card>
            <section>
                <base-spinner v-if="isLoading && !error"></base-spinner>
                <p v-else-if="!error && !isLoading">
                    Currently no activities registered
                </p>
                <p v-else-if="error && !isLoading">
                    There was an error
                </p>
                <ul v-if="!isLoading">
                    <li v-for="act in activities" :key="act.id">
                        <span>{{ act.activity }}</span>
                        <div>
                            <base-button @click="editItem(index, activity)"
                                >Edit</base-button
                            >
                            <base-button @click="removeItem(act.id)"
                                >Delete</base-button
                            >
                        </div>
                    </li>
                </ul>
            </section>
        </base-card>
    </div>
</template>

<script>
import { activitiesRef, db } from './../firebaseConfig';
import axios from 'axios';
const baseUrl = `https://complex-to-do-default-rtdb.firebaseio.com/`;
export default {
    data() {
        return {
            selectedActivityIndex: null,
            activity: '',
            isEditting: false,
            pendingActivity: null,
            error: false,
            errorMessage: null,
            isLoading: false,
            activities: [],
        };
    },
    firebase: {
        storedActivities: activitiesRef,
    },
    computed: {
        hasActivities() {
            return this.$store.getters.hasActivities;
        },
        allActivities() {
            return this.$store.getters.allActivities;
        },
    },
    async created() {
        this.loadSavedActivities();
    },
    methods: {
        async addActivity() {
            this.error = false;
            this.errorMessage = null;
            if (this.activity === '') {
                this.error = true;
                this.errorMessage =
                    'Please enter an activity before hitting the add button';
                return;
            }
            const newActivity = this.activity;
            // this.allActivities.push(newActivity);
            activitiesRef.push(this.activity);
            this.$store.dispatch('addActivity', newActivity);
            this.activity = '';
        },
        // loadAllActivities() {
        //     const storedActivities = this.$store.getters.allActivities;
        //     this.allActivities = storedActivities;
        // },
        async removeItem(id) {
            try {
                const selectedUser = db.ref('activities/' + id);
                selectedUser.remove();
            } catch (error) {
                console.log(error);
            }
            // this.$store.dispatch('deleteActivity', index);
        },
        editItem(index, activity) {
            this.selectedActivityIndex = index;
            this.activity = activity;
            this.isEditting = true;
        },
        cancelEdit() {
            this.selectedActivityIndex = null;
            this.activity = '';
            this.isEditting = false;
        },
        saveEdit() {
            const payload = {
                index: this.selectedActivityIndex,
                newActivity: this.activity,
            };
            this.$store.dispatch('editActivity', payload);
            this.activity = '';
            this.selectedActivityIndex = null;
            this.isEditting = false;
        },
        async loadSavedActivities() {
            this.isLoading = true;
            const response = await axios.get(baseUrl + 'activities.json');
            // console.log(response.data);
            const loadedActivities = [];
            for (const [id, activity] of Object.entries(response.data)) {
                const loadedAct = {
                    id,
                    activity,
                };
                loadedActivities.push(loadedAct);
            }
            this.activities = loadedActivities;
            this.isLoading = false;
        },
    },
};
</script>

<style scoped>
.input-group {
    margin: 0.5rem 0;
}

input {
    display: inline-block;
    width: 70%;
    border: 1px solid #ccc;
    font: inherit;
    margin-right: 1rem;
    padding: 0.3rem 0.5rem;
}

input:focus {
    background-color: #f0e6fd;
    outline: none;
    border-color: #3d008d;
}

h3 {
    margin: 0.5rem 0;
    font-size: 1rem;
}

.invalid input {
    border: 1px solid red;
}
li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    list-style: none;
    width: 85%;
    padding: 0.5rem;
    border: 1px solid black;
    border-radius: 3px;
    margin: 1rem 0;
}
span {
    color: black;
    font-size: 1.3rem;
}

label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
}
</style>

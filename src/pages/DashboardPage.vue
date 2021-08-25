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

                <ul v-if="!isLoading">
                    <li v-for="act of activities" :key="act['.key']">
                        <span>{{ act.activity }}</span>
                        <div>
                            <base-button
                                @click="editItem(act['.key'], act.activity)"
                                >Edit</base-button
                            >
                            <base-button @click="removeItem(act['.key'])"
                                >Delete</base-button
                            >
                        </div>
                    </li>
                </ul>
                <!-- <p v-if="!error && !isLoading">
                    Currently no activities registered
                </p> -->
                <p v-if="error && !isLoading">
                    There was an error
                </p>
            </section>
        </base-card>
    </div>
</template>

<script>
import { activitiesRef, db } from './../firebaseConfig';
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
        activities: activitiesRef,
    },
    async mounted() {
        this.isLoading = true;
        await this.$rtdbBind('activities', activitiesRef);
        this.isLoading = false;
    },
    methods: {
        addActivity() {
            this.error = false;
            this.errorMessage = null;
            if (this.activity === '') {
                this.error = true;
                this.errorMessage =
                    'Please enter an activity before hitting the add button';
                return;
            }
            activitiesRef.push({ activity: this.activity });
            this.activity = '';
        },
        removeItem(id) {
            activitiesRef.child(id).remove();
        },
        editItem(id, activity) {
            this.selectedActivityIndex = id;
            this.activity = activity;
            this.isEditting = true;
        },
        cancelEdit() {
            this.selectedActivityIndex = null;
            this.activity = '';
            this.isEditting = false;
        },
        saveEdit() {
            activitiesRef
                .child(this.selectedActivityIndex)
                .update({ activity: this.activity });
            this.activity = '';
            this.selectedActivityIndex = null;
            this.isEditting = false;
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

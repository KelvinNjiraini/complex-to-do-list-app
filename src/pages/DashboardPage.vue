<template>
    <div>
        <base-card>
            <h3>My Dashboard</h3>
            <section>
                <form @submit.prevent="addActivity">
                    <div class="input-group">
                        <label for="id">id</label>
                        <input type="text" v-model.trim="activity.id" />
                    </div>
                    <div class="input-group">
                        <label for="activity">Activity</label>
                        <input type="text" v-model.trim="activity.val" />
                        <p v-if="error">{{ errorMessage }}</p>
                    </div>
                    <base-button>Add</base-button>
                </form>
            </section>
        </base-card>
        <base-card>
            <section>
                <ul v-if="hasActivities">
                    <li v-for="activity in allActivities" :key="activity.id">
                        <span>{{ activity.val }}</span>
                        <div>
                            <base-button
                                @click="$emit('editActivityValue', activity)"
                                >Edit</base-button
                            >
                            <base-button @click="removeItem(activity.id)"
                                >Delete</base-button
                            >
                        </div>
                    </li>
                </ul>

                <p v-else-if="!hasActivities && !error">
                    Currently no activities registered
                </p>
                <p v-else-if="error">
                    There was an error
                </p>
            </section>
        </base-card>
    </div>
</template>

<script>
import EditActivity from './../components/misc/EditActivity.vue';
export default {
    components: {
        EditActivity,
    },
    data() {
        return {
            activity: {
                val: '',
                id: null,
            },
            error: false,
            errorMessage: null,
            allActivities: [],
        };
    },
    computed: {
        hasActivities() {
            // return this.allActivities.length > 0;
            return (
                this.$store.getters.hasActivities &&
                this.allActivities.length > 0
            );
        },
    },
    methods: {
        addActivity() {
            this.error = false;
            this.errorMessage = null;
            if (this.activity.val === '') {
                this.error = true;
                this.errorMessage =
                    'Please enter an activity before hitting the add button';
                return;
            }
            const newActivity = {
                id: this.activity.id,
                val: this.activity.val,
            };
            // this.allActivities.push(newActivity);
            this.$store.dispatch('addActivity', newActivity);
            this.activity.id = null;
            this.activity.val = '';
        },
        loadAllActivities() {
            const storedActivities = this.$store.getters.allActivities;
            this.allActivities = storedActivities;
        },
        removeItem(id) {
            const filteredActivities = this.allActivities.filter((activity) => {
                return activity.id !== id;
            });
            this.allActivities = filteredActivities;
        },
    },
    created() {
        this.loadAllActivities();
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

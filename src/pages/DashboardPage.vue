<template>
    <base-card>
        <h3>My Dashboard</h3>
        <section>
            <div class="input-group">
                <input
                    type="text"
                    v-model.trim="newActivity"
                    @keydown.enter="addActivity"
                />
                <base-button @click="addActivity">Add</base-button>
            </div>
        </section>
        <section>
            <p v-if="!allActivities">Currently no activities registered</p>
            <ul>
                <li v-for="activity in allActivities" :key="activity">
                    {{ activity }}
                </li>
            </ul>
        </section>
    </base-card>
</template>

<script>
export default {
    data() {
        return {
            newActivity: '',
        };
    },
    computed: {
        allActivities() {
            return this.$store.getters.allActivities;
        },
    },
    methods: {
        addActivity() {
            this.$store.dispatch('addActivity', this.newActivity);
            this.newActivity = '';
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
</style>

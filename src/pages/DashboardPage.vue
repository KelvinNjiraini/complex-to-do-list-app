<template>
    <base-card>
        <h3>My Dashboard</h3>
        <section>
            <div class="input-group">
                <input
                    type="text"
                    v-model.trim="newActivity.val"
                    @keydown.enter="addActivity"
                />
                <base-button @click="addActivity">Add</base-button>
            </div>
        </section>
        <section>
            <ul>
                <li>
                    <span>{{ activity.val }}</span>
                    <div>
                        <base-button>Edit</base-button>
                        <base-button>Delete</base-button>
                    </div>
                </li>
            </ul>
            <p>Currently no activities registered</p>
        </section>
    </base-card>
</template>

<script>
export default {};
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
</style>

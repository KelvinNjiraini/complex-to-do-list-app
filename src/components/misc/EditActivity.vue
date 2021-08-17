<template>
    <base-card>
        <form @submit.prevent="saveChanges">
            <input type="text" v-model="newValue" />
            <button>Save</button>
        </form>
    </base-card>
</template>
<script>
export default {
    data() {
        return {
            newValue: '',
        };
    },
    methods: {
        saveChanges() {
            const updatedValue = this.newValue;
            $this.$emit('changeActivityValue', updatedValue);
        },
    },
};
</script>
<style scoped></style>

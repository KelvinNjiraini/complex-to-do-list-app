<template>
    <the-header></the-header>
    <router-view />
</template>
<script>
import TheHeader from './components/layout/TheHeader.vue';
export default {
    components: {
        TheHeader,
    },
    created() {
        this.$store.dispatch('tryLogin');
    },
};
</script>

<template>
    <div>
        <base-dialog
            :show="!!error"
            title="An error occurred"
            @close="handleError"
        >
            <p>{{ error }}</p>
        </base-dialog>
        <base-dialog :show="isLoading" fixed title="Authenticating...">
            <base-spinner></base-spinner>
        </base-dialog>
        <base-card>
            <h3>Log into your account</h3>
            <form @submit.prevent="Login">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        v-model.trim="email"
                    />
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        v-model.trim="password"
                    />
                </div>
                <base-button>Login</base-button>
            </form>
        </base-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            error: null,
            isLoading: false,
            formisValid: true,
        };
    },
    methods: {
        async Login() {
            if (this.email === '' || !this.email.includes('@')) {
                this.formisValid = false;
                return;
            }
            if (this.password.length < 6) {
                this.formisValid = false;
                return;
            }
            this.isLoading = true;
            try {
                await this.$store.dispatch('login', {
                    email: this.email,
                    password: this.password,
                });
            } catch (error) {
                this.error =
                    error.message || 'Failed to sign up. Try again later';
            }
            this.isLoading = false;
            this.$router.replace('/dashboard');
        },
        handleError() {
            this.error = null;
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
    margin: 0.8rem 0;
    font-size: 1.5rem;
}

.invalid input {
    border: 1px solid red;
}

label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
}
button {
    outline: none;
    margin: 0.6rem 0;
}
</style>

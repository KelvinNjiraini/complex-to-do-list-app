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
            <h3>Sign up to your account</h3>
            <form @submit.prevent="signUp">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        v-model.trim="email"
                    />
                    <p v-if="!formisValid">
                        Please enter a valid email address
                    </p>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        v-model.trim="password"
                    />
                    <p v-if="!formisValid">
                        Password must be longer than 6 characters
                    </p>
                </div>
                <base-button>Sign Up</base-button>
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
        async signUp() {
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
                await this.$store.dispatch('signup', {
                    email: this.email,
                    password: this.password,
                });
                this.$router.replace('/dashboard');
            } catch (error) {
                this.error =
                    error.message || 'Failed to sign up. Try again later';
            }
            this.isLoading = false;
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

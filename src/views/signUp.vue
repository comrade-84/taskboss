
<template>
    <div>
        <div class="signup mt-5 rounded m-auto p-4 border">
            <h2 class="fs-3 d-flex justify-content-between align-items-center my-3 text-center text-capitalize">
                <logo-view />
                <span>Welcome to TaskBoss</span>
            </h2>
            <input-field v-model="form.nameInput" placeholder="Input your Username" type="text" />
            <div v-if="errors.name" class="text-danger">{{ errors.name }}</div>
            <input-field v-model="form.emailInput" placeholder="Type your email here" type="email" />
            <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
            <input-field v-model="form.passwordInput" placeholder="type your password" type="password" />
            <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            <input-field v-model="form.confirmPasswordInput" placeholder="confirm your password" type="password" />
            <div v-if="errors.confirmPassword" class="text-danger">{{ errors.confirmPassword }}</div>
            <div class="signupbtn-loginlink d-flex align-items-center py-3 mt-4 justify-content-between">
                <button-element btn-type="submit" @button-clicked="onButtonClick" btn-text="signup" />
                <div class="loginlink">Have an account? <router-link :to="{name:'login'}">login</router-link></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                nameInput: '',
                emailInput: '',
                passwordInput: '',
                confirmPasswordInput: '',
            },

            errors: {},
            users: JSON.parse(localStorage.getItem('users')) || [] ,
            passwordRegx:  /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,16}$/,
            isValid: null 
        }
    },
   methods: {

    storeUser(){
        localStorage.setItem('users', JSON.stringify(this.users))
    },
    onButtonClick() {
        this.errors = {};
        this.isValid = true; 

        // Username validation
        if (!this.form.nameInput) {
            this.errors.name = "Username is required";
            this.isValid = false;
        }

        // Email validation 
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!this.form.emailInput) {
            this.errors.email = "Email is required";
            this.isValid = false;
        } else if (!emailPattern.test(this.form.emailInput)) {
            this.errors.email = "Invalid email address";
            this.isValid = false;
        }

        // Password validation
        if (!this.form.passwordInput) {
            this.errors.password = "Password is required";
            this.isValid = false;
        } else if (!this.passwordRegx.test(this.form.passwordInput)) {
            this.errors.password = "Password must contain at least 1 uppercase and number";
            this.isValid = false;
        } else if (this.form.passwordInput.length < 6) {
            this.errors.password = "Password must be at least 6 characters";
            this.isValid = false;
        }

        // Confirm password validation
        if (!this.form.confirmPasswordInput) {
            this.errors.confirmPassword = "Please confirm your password";
            this.isValid = false;
        } else if (this.form.passwordInput !== this.form.confirmPasswordInput) {
            this.errors.confirmPassword = "Passwords do not match";
            this.isValid = false;
        }

       
       if (this.isValid) {
    this.users.push({
        name: this.form.nameInput,
        email: this.form.emailInput,
        password: this.form.passwordInput,
    });
    this.storeUser();
    console.log(this.users);

    this.form = { nameInput: '', emailInput: '', passwordInput: '', confirmPasswordInput: '' };
    alert("Sign up successful!");
     this.$router.push({ name: 'login' });
}
    }
}
}
</script>

<style scoped>
.signup{
 width:40%;
}
@media screen and (max-width:500px) {
    .signup{
        width:80% ;
    }
}
</style>

















<template>
  <div>
    <div class="login m-auto mt-5 border p-3 rounded">
      <h2
        class="fs-3 d-flex justify-content-center gap-3 align-items-center my-3 text-center text-capitalize"
      >
        <logo-view /> <span>Login</span>
      </h2>
      <input-field v-model="nameInput" placeholder="Input your Username" type="text" />
      <div v-if="errors.name" class="text-danger">{{ errors.name }}</div>
      <input-field v-model="passwordInput" placeholder="Input your Password" type="password" />
      <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
      <div v-if="errors.credentials" class="text-danger">{{ errors.credentials }}</div>
      <div class="signupbtn-loginlink d-flex align-items-center py-3 mt-4 justify-content-between">
        <button-element btn-type="submit" btn-text="Login" @button-clicked="onLogin" />
        <div class="loginlink">
          Dont have an account? <router-link :to="{ name: 'signup' }">Signup</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nameInput: '',
      passwordInput: '',
      users: JSON.parse(localStorage.getItem('users')) ,
      errors: {},
      loggedInUser: null 
    }
  },
  methods: {
    onLogin() {
      this.errors = {};

      if (!this.nameInput) {
        this.errors.name = "Username is required";
      }
      if (!this.passwordInput) {
        this.errors.password = "Password is required";
      }

      if (Object.keys(this.errors).length === 0) {
        const userExist = this.users.find(
          user => user.name === this.nameInput && user.password === this.passwordInput
        );
        if (userExist) {
          alert("Login successful!", userExist);
          this.loggedInUser = userExist ;
           localStorage.setItem('loggedInUser', JSON.stringify(userExist));
          this.$router.push({ name: 'dashboard' });
         
        } else {
          this.errors.credentials = "Invalid username or password";
        }
      }
    }
  }
}
</script>

<style scoped>
.login {
  width: 30%;
}

@media screen and (max-width:500px) {
    .login{
        width:80% ;
    }
}
</style>
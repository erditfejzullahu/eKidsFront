<template>
  <div class="login-wrapper mx-auto flex flex-col items-center justify-center">
    <div class="flex flex-col gap-3 p-7" id="login-form">
      <h2 class="text-center">E-Kids Login</h2>
      <Form @submit="performLogin">
        <div class="flex flex-col">
          <label for="username">Username:</label>
          <Field type="text" id="username" name="username" rules="required" v-model="formData.username" />
          <ErrorMessage name="username" />
        </div>
        <div class="flex flex-col mt-4">
          <label for="password">Password:</label>
          <Field type="password" id="password" name="password" rules="required" v-model="formData.password" />
          <ErrorMessage name="password" />
        </div>
        <button class="main-button mt-8" type="submit">Login</button>
        <p v-if="loginError" class="mt-4" style="color:red;">{{ loginError }}</p>
      </Form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'LoginView',
    data() {
        return {
            formData: {
                username: '',
                password: '',
            },
            loginError: '',
        }
    },
    methods: {
        ...mapActions(['login']), // Mapping 'login' action to the component's methods
    async performLogin() {
      // Dispatch the 'login' action from Vuex store
      try{
        await this.login({
            username: this.formData.username,
            password: this.formData.password
        });
      }catch(error){
        this.loginError = error;
      }
      
      // After login action, you can perform any redirection or other logic
      this.$router.push('/');
    }
    }
}
</script>

<style scoped>
.main-button{
    width:100%!important;
}
#login-form{
    background:#fff;
    width:400px;
    box-shadow:0 0 10px #d9d9d9;
}
.login-wrapper{
    height:100vh;
}
</style>
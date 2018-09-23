<template>
    <div>
        <h1>Register</h1>
        <v-divider class="my-3"></v-divider>
        <v-card class="register">
                <h5 v-if="true">{{message}}</h5>
                <v-form ref="form" v-model="valid" lazy-validation onSubmit="return false">
                    <v-text-field label="Username" :rules="usernameRules" v-model="username" required></v-text-field>
                    <v-text-field label="E-mail" :rules="emailRules" v-model="email" required></v-text-field>
                    <v-text-field type="password" :rules="passwordRules" :counter="5" label="Password" v-model="password" required></v-text-field>
                    <v-btn type="submit" :disabled="!valid" @click="register">Register</v-btn>
                    <v-btn @click="clear">Clear</v-btn>
                </v-form>
        </v-card>
        <v-divider class="my-3"></v-divider>
        <div>
            <p>Do you have account ? <span><router-link to="/join/login">Login</router-link></span></p>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    valid: true,
    username: '',
    usernameRules: [
      v => !!v || 'Username is required'
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 5) || 'Password must be more than 5 characters'
    ],
    message: '',
    notif: false
  }),
  methods: {
    register () {
      if (this.$refs.form.validate()) {
        axios({
          method: 'POST',
          url: `${api}/users/register`,
          data: {
            username: this.username,
            email: this.email,
            password: this.password
          }
        })
          .then((result) => {
            this.$router.push('/join/login')
            this.username = ''
            this.email = ''
            this.password = ''
          })
          .catch((err) => {
            if (err.response.data.message) {
              this.notif = true
              this.message = 'Account already exists !'
            }
          })
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>

<style>
.register {
  padding: 20px;
  color: white;
}
</style>

<template>
    <div>
    <h1>Login</h1>
    <v-divider class="my-3"></v-divider>
        <v-card class="login">
            <v-form ref="form" v-model="valid" lazy-validation onSubmit="return false">
                <v-text-field label="E-mail" :rules="emailRules" v-model="email" required></v-text-field>
                <v-text-field type="password" :rules="passwordRules" :counter="5" v-model="password" label="Password" required></v-text-field>
                <v-btn type="submit" :disabled="!valid" @click="login">Login</v-btn>
                <v-btn @click="clear">Clear</v-btn>
            </v-form>
        </v-card>
        <v-divider class="my-3"></v-divider>
        <div>
            <p>Don't have account ? <span><router-link to="/join">Register</router-link></span></p>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      valid: true,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 5) || 'Password must be more than 5 characters'
      ]
    }
  },
  methods: {
    login () {
      if (this.$refs.form.validate()) {
        axios({
          method: 'POST',
          url: `http://localhost:3000/users/login`,
          data: {
            email: this.email,
            password: this.password
          }
        })
          .then((result) => {
            let token = result.data.data.token
            localStorage.setItem('token', token)
            this.$router.push('/article')
          })
          .catch((err) => {
            console.log(err.response)
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
.login {
  padding: 25px;
  color: white;
}
</style>

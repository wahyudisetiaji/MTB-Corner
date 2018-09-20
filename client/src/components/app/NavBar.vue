<template>
    <div id="navbar">
        <v-responsive>
          <v-toolbar>
              <v-toolbar-title>MTB-Corner</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items class="hidden-sm-and-down">
                  <v-btn flat to="/">Home</v-btn>
                  <v-btn flat to="/article">Article</v-btn>
                  <v-btn flat v-if="!tokenhome" to='/join'>Join</v-btn>
                  <v-btn flat v-if="tokenhome" @click="logout">Logout</v-btn>
              </v-toolbar-items>
          </v-toolbar>
        </v-responsive>
    </div>
</template>

<script>
export default {
  props: ['tokenhome'],
  data () {
    return {
      isLogout: false
    }
  },
  methods: {
    logout () {
      localStorage.clear()
      this.isLogout = true
      this.$emit('data-logout', this.isLogout)
    }
  },
  created () {
    let token = localStorage.getItem('token')
    if (token) {
      this.token = true
    } else {
      this.token = false
    }
  },
  watch: {
    isLogout () {
      this.tokenhome = false
    }
  }
}
</script>

<style>

</style>

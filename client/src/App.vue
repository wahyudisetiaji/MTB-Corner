<template>
  <div id="app">
      <NavBar :tokenhome="token" @data-logout="isLogout=$event"></NavBar>
        <router-view @data-token="token=$event" :tokenapp="token" :isLogoutApp="isLogout"></router-view>
      <Footer></Footer>
  </div>
</template>

<script>
import NavBar from '@/components/app/NavBar.vue'
import Footer from '@/components/app/Footer.vue'

export default {
  name: 'app',
  components: {
    NavBar,
    Footer
  },
  data () {
    return {
      token: false,
      isLogout: false
    }
  },
  watch: {
    isLogout () {
      this.token = false
    }
  }
}
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: black;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
* {
  padding: 0;
  margin: 0;
}
</style>

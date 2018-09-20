<template>
    <div>
        <v-flex xs12 fluid>
            <v-layout row wrap>
                <v-flex xs6>
                  <div class="jumbotron">
                    <JumbotronJoin></JumbotronJoin>
                  </div>
                </v-flex>
                <v-flex xs6>
                    <div class="register">
                        <router-view></router-view>
                    </div>
                </v-flex>
            </v-layout>
        </v-flex>
    </div>
</template>

<script>
import CarouselJoin from '@/components/join/CarouselJoin.vue'
import JumbotronJoin from '@/components/join/JumbotronJoin.vue'

export default {
  name: 'join',
  props: ['tokenapp'],
  components: {
    CarouselJoin,
    JumbotronJoin
  },
  created () {
    let token = localStorage.getItem('token')
    if (token) {
      this.tokenapp = true
    } else {
      this.tokenapp = false
    }
  }
}
</script>

<style>
.jumbotron {
    margin: 10px;
    background-color: white;
}
.register {
    margin: 10px;
}
</style>

<template>
    <v-container fluid>
        <v-layout row wrap>
            <v-flex xs2>
                <v-layout>
                    <v-flex xs12>
                        <Actions :tokenarticle="tokenapp"></Actions>
                        <Search :datastatus="status" :datasearch="dataallarticles" @data-after-search="getarticles=$event"></Search>
                        <Category @data-category="category=$event" :datastatus="status"></Category>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex xs10 pa-2>
                    <router-view :articlecategory="category" @data-myarticle="status=$event" :resultsearch="getarticles" @data-allarticle="dataallarticles=$event" :tokenarticle="tokenapp"></router-view>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

import Actions from '@/components/sidebar/Actions.vue'
import Category from '@/components/sidebar/Category.vue'
import Search from '@/components/sidebar/Search.vue'

export default {
  components: {
    Actions,
    Category,
    Search
  },
  props: ['tokenapp'],
  data () {
    return {
      category: '',
      dataallarticles: '',
      status: false,
      getarticles: ''
    }
  },
  created () {
    let token = localStorage.getItem('token')
    if (token) {
      token = true
      this.$emit('data-token', token)
    } else {
      this.tokenapp = false
    }
  }
}
</script>
<style>

</style>

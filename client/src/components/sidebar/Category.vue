<template>
  <v-layout v-if="!datastatus">
    <v-flex xs12>
      <v-card class="category">
        <h3>Category</h3>
        <v-container fluid>
          <v-layout row wrap>
            <v-layout column>
                <v-btn flat @click="allArticles('All')" color="info" >All Posted</v-btn>
                <v-btn flat @click="allArticles('Bike')" color="info" >Bike</v-btn>
                <v-btn flat @click="allArticles('News')" color="info">News</v-btn>
                <v-btn flat @click="allArticles('Event')" color="info">Event</v-btn>
                <v-btn flat @click="allArticles('Trip')" color="info">Trip</v-btn>
            </v-layout>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'
export default {
  props: ['datastatus'],
  data () {
    return {
    }
  },
  methods: {
    allArticles (category) {
      axios({
        method: 'GET',
        url: `${api}/articles/category/${category}`
      })
        .then((result) => {
          let category = result.data.result
          this.$emit('data-category', category)
        })
        .catch((err) => {
          console.log(err.response)
        })
    }
  }
}
</script>

<style>
.category {
  margin-top: 5%;
  padding: 5%;
}
</style>

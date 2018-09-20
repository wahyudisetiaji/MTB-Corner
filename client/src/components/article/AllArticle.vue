<template>
    <div>
        <v-layout row>
            <v-flex xs12>
            <v-card class="article" v-for="(data, index) in articles" :key="index">
                <v-img  v-bind:src="data.image" aspect-ratio="1.75"></v-img>

                <v-card-text>
                    <div>
                        <h3 class="headline">{{data.articleTitle}}</h3>
                        <h5 class="caption">Posted on {{ moment(data.createdAt).format("dddd, MMMM Do YYYY, h:mm") }} WIB, by {{data.userId.username}}</h5>
                    </div>
                <v-btn flat color="black">Share</v-btn>
                <v-btn flat v-if="tokenarticle" color="black" :to="`/article/detail/${data._id}`">Detail</v-btn>
                </v-card-text>
            </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  props: ['articlecategory', 'datamyarticle', 'tokenarticle', 'resultsearch'],
  data () {
    return {
      articles: ''
    }
  },
  methods: {
    moment: function (date) {
      return moment(date)
    }
  },
  created () {
    this.status = false
    this.$emit('data-myarticle', this.status)
    axios({
      method: 'GET',
      url: `http://localhost:3000/articles`
    })
      .then((result) => {
        this.articles = result.data.result
        this.$emit('data-allarticle', this.articles)
      })
      .catch((err) => {
        console.log(err.response)
      })
  },
  watch: {
    articlecategory: function (newData, oldData) {
      if (newData) {
        this.articles = newData
      }
    },
    resultsearch: function (newData, oldData) {
      if (newData) {
        this.articles = newData
      }
    }
  }
}
</script>

<style>
.article {
    margin: 3%
}
</style>

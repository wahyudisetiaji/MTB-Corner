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
                <v-btn v-if="tokenarticle" color="black" style="color:white" :to="`/article/detail/${data._id}`">Detail</v-btn><br>
                <div>
                  <span class="facebook caption">Share with <VueGoodshareFacebook :page_url="`https://mtb-corner.wahyudisetiaji.xyz`" title_social="Facebook" style="color:white;" has_icon><img :src="data.image" alt="image"></VueGoodshareFacebook></span>
                </div>
                </v-card-text>
            </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import VueGoodshareFacebook from 'vue-goodshare/src/providers/Facebook.vue'

export default {
  props: ['articlecategory', 'datamyarticle', 'tokenarticle', 'resultsearch'],
  components: {
    VueGoodshareFacebook
  },
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
      url: `${api}/articles`
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

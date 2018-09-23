<template>
    <v-layout>
        <v-flex xs12>
        <v-card class="detail">
            <v-img v-bind:src="image" aspect-ratio="1.75"></v-img>
            <v-card-text>
                <div>
                    <h3 class="headline">{{articleTitle}}</h3>
                    <div id="content" v-html="article"></div>
                </div>
            </v-card-text>
            <h5 class="caption">Posted on {{ moment(createdAt).format("dddd, MMMM Do YYYY, h:mm") }} WIB, by {{posted}}</h5>
            <div class="comment">
                <v-text-field label="Comment" v-model="comment" required></v-text-field><br>
                <p class="caption text-sm-right font-italic font-weight-light">
                    <span class="facebook caption">Share with <VueGoodshareFacebook :page_url="`https://mtb-corner.wahyudisetiaji.xyz/#/article/detail/${data._id}`" title_social="Facebook" style="color:white;" has_icon> <img :src="image" alt="image"></VueGoodshareFacebook></span>
                    <v-btn v-if="!tokenarticle" color="black" class="text-sm-right" style="color:white" to="/join/login">Please Login</v-btn>
                    <v-btn v-if="tokenarticle" color="black" class="text-sm-right" style="color:white" @click="createComment(data._id)">Comment</v-btn>
                    <v-btn color="black" class="text-sm-right"  style="color:white" to="/article">Back</v-btn>
                </p>
            </div>
        </v-card>
        <AllComment :datadetail="data" :tokendetail="tokenarticle"></AllComment>
        </v-flex>
    </v-layout>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import AllComment from '@/components/article/AllComment.vue'
import VueGoodshareFacebook from 'vue-goodshare/src/providers/Facebook.vue'

export default {
  props: ['tokenarticle'],
  components: {
    AllComment,
    VueGoodshareFacebook
  },
  data () {
    return {
      id: '',
      data: '',
      articleTitle: '',
      image: '',
      article: '',
      createdAt: '',
      posted: '',
      comment: '',
      actions: ''
    }
  },
  methods: {
    moment: function (date) {
      return moment(date)
    },
    createComment (id) {
      let token = localStorage.getItem('token')
      axios({
        method: 'PUT',
        url: `${api}/articles/comment/${id}`,
        headers: {
          token
        },
        data: {
          comment: this.comment
        }
      })
        .then((result) => {
          this.comment = ''
          this.actions = result
        }).catch((err) => {
          console.log(err.response)
        })
    },
    oneArticle () {
      let id = this.$route.params.id
      axios({
        method: 'GET',
        url: `${api}/articles/article/${id}`
      })
        .then((result) => {
          this.id = result.data.articles._id
          this.data = result.data.articles
          this.articleTitle = result.data.articles.articleTitle
          this.image = result.data.articles.image
          this.article = result.data.articles.article
          this.createdAt = result.data.articles.createdAt
          this.posted = result.data.articles.userId.username
        })
        .catch((err) => {
          console.log(err.message)
        })
    }
  },
  created () {
    this.oneArticle()
  },
  watch: {
    actions: function (newData, oldData) {
      if (newData) {
        this.oneArticle()
      }
    }
  }
}
</script>

<style>
.comment {
  padding: 2%
}
.detail {
    max-width: 100%;
}
</style>

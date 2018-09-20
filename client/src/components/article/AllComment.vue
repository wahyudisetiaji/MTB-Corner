<template>
        <v-layout>
            <v-flex xs12>
                <v-card class="comment" v-for="(data,index) in datadetail.comments" :key="index">
                        <label class="title">{{data.comment}}</label>
                        <h5 class="caption">Posted on {{ moment(data.date).format("dddd, MMMM Do YYYY, h:mm") }} WIB, by {{data.viewer}}</h5>
                        <v-layout row justify-end>
                            <v-flex xs2>
                                <v-btn v-if="viewer == data.viewer & tokendetail || viewer == datadetail.userId.username & tokendetail" color="black" class="font-italic font-weight-light" style="color:white" @click="deleteComment(data._id)">Delete</v-btn>
                            </v-flex>
                        </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
</template>

<script>
import moment from 'moment'
import axios from 'axios'

export default {
  props: ['datadetail', 'tokendetail'],
  data () {
    return {
      actions: ''
    }
  },
  methods: {
    moment: function (date) {
      return moment(date)
    },
    deleteComment (idComment) {
      let idArticle = this.datadetail._id
      let token = localStorage.getItem('token')
      axios({
        method: 'PUT',
        url: `http://localhost:3000/articles/comment/delete/${idArticle}`,
        headers: {
          token
        },
        data: {
          idComment: idComment
        }
      })
        .then((result) => {
          this.actions = result
        })
        .catch((err) => {
          console.log(err.response)
        })
    },
    dataUser () {
      let token = localStorage.getItem('token')
      axios({
        method: 'GET',
        url: `http://localhost:3000/users`,
        headers: {
          token
        }
      })
        .then((result) => {
          this.viewer = result.data.data.username
        })
        .catch((err) => {
          console.log(err.response)
        })
    }
  },
  created () {
    this.dataUser()
  },
  watch: {
    actions: function (newData, oldData) {
      if (newData) {
        let id = this.$route.params.id
        axios({
          method: 'GET',
          url: `http://localhost:3000/articles/article/${id}`
        })
          .then((result) => {
            this.datadetail = result.data.articles
          })
          .catch((err) => {
            console.log(err.message)
          })
      }
    }
  }
}
</script>

<style>
.comment {
  margin: 1%;
}
</style>

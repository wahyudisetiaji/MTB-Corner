<template>
    <div>
        <h2 class="headline myarticle">My Article</h2>
        <v-layout row>
            <v-flex xs12 >
            <v-card max-width="100%" class="card" v-for="(data, index) in myarticles" :key="index">
                <v-card-text>
                        <h3>{{data.articleTitle}}</h3>
                        <v-layout row wrap justify-center="">
                            <v-btn :to="`/article/detail/${data._id}`">Detail</v-btn>
                            <v-btn :to="`/article/update/${data._id}`">Update</v-btn>
                            <v-btn @click="deleteArticle(data._id)">Delete</v-btn>
                        </v-layout>
                </v-card-text>
            </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      myarticles: '',
      actions: ''
    }
  },
  created () {
    this.status = true
    this.$emit('data-myarticle', this.status)
    let token = localStorage.getItem('token')
    axios({
      method: 'GET',
      url: `${api}/articles/myarticle`,
      headers: {
        token
      }
    })
      .then((result) => {
        this.myarticles = result.data.result
      })
      .catch((err) => {
        console.log(err.response)
      })
  },
  methods: {
    deleteArticle (id) {
      let token = localStorage.getItem('token')
      axios({
        method: 'DELETE',
        url: `${api}/articles/delete/${id}`,
        headers: {
          token
        }
      })
        .then((result) => {
          this.actions = result
          this.$router.push('/article/myarticle')
        })
        .catch((err) => {
          console.log(err.response)
        })
    }
  },
  watch: {
    actions: function (newData, oldData) {
      if (newData) {
        let token = localStorage.getItem('token')
        axios({
          method: 'GET',
          url: `${api}/articles/myarticle`,
          headers: {
            token
          }
        })
          .then((result) => {
            this.myarticles = result.data.result
          })
          .catch((err) => {
            console.log(err.response)
          })
      }
    }
  }
}
</script>

<style>
.myarticle {
    color: white;
}
.card {
    margin: 2%;
}
</style>

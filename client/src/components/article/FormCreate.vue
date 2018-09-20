<template>
    <v-layout>
        <v-flex xs12>
            <v-card>
                <v-form class="create" v-model="valid" onSubmit="return false">
                    <h2>Create Article</h2>
                    <v-text-field label="Title" v-model="articleTitle" required></v-text-field><br>
                    <v-layout class="image">
                    <label for="image">Image</label>
                    <input label="image" type="file" id="image" v-on:change="getImage($event)">
                    </v-layout><br>
                    <wysiwyg label="Article" v-model="article" required/><br>
                    <label for="category">Select Category</label>
                    <select class="custom-select" v-model="category">
                        <option category="Bike">Bike</option>
                        <option category="News">News</option>
                        <option category="Event">Event</option>
                        <option category="Trip">Trip</option>
                    </select><br><br>
                    <v-btn class="button" type="submit" @click="create">Create</v-btn>
                    <v-btn class="button" @click="clear">clear</v-btn>
                </v-form>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      valid: true,
      articleTitle: '',
      image: '',
      article: '',
      category: ''
    }
  },
  methods: {
    getImage (link) {
      this.image = link.target.files[0]
    },
    create () {
      let token = localStorage.getItem('token')
      let formData = new FormData()
      formData.append('image', this.image)
      axios.post(`http://localhost:3000/articles/upload`, formData)
        .then((result) => {
          axios({
            method: 'POST',
            url: `http://localhost:3000/articles/create`,
            headers: {
              token
            },
            data: {
              articleTitle: this.articleTitle,
              image: result.data.link,
              article: this.article,
              category: this.category
            }
          })
            .then((result) => {
              this.articleTitle = ''
              this.image = ''
              this.article = ''
              this.category = ''
              this.$router.push('/article/myarticle')
            }).catch((err) => {
              console.log(err.response)
            })
        })
        .catch((err) => {
          console.log(err.response)
        })
    },
    clear () {
      this.articleTitle = ''
      this.image = ''
      this.article = ''
      this.category = ''
    }
  },
  created () {
    this.status = true
    this.$emit('data-myarticle', this.status)
  }
}
</script>

<style>
.create {
    padding: 25px;
}
</style>

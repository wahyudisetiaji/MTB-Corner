<template>
     <v-card class="search" ma-1 v-if="!datastatus">
        <v-card-actions>
            <v-text-field name="name" label="Search by Title" id="id" v-model="search"></v-text-field>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
  props: ['datastatus', 'datasearch'],
  data () {
    return {
      search: '',
      tmp: ''
    }
  },
  watch: {
    search: function (newData, oldData) {
      if (newData) {
        let articles = []
        this.datasearch.forEach(element => {
          if (element.articleTitle.toLowerCase().indexOf(newData.toLowerCase()) > -1) {
            articles.push(element)
          }
        })
        this.tmp = articles
        this.$emit('data-after-search', this.tmp)
      }
    }
  }
}
</script>

<style>
.search {
    margin-top: 10px;
    padding:10px;
}
</style>

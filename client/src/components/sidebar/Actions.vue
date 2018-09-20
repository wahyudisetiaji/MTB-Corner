<template>
    <v-card v-if="tokenarticle" class="actions" ma-1>
            <v-card-text>
            <v-btn class="button" to="/article/create">Create Article</v-btn>
            <v-btn class="button" to="/article/myarticle">My Article</v-btn>
            </v-card-text>
    </v-card>
</template>

<script>
export default {
  props: ['tokenarticle'],
  data () {
    return {
    }
  }
}
</script>

<style>
.button {
  background-color: black;
  color: white;
}
</style>

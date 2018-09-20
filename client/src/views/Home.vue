<template>
    <div>
      <CarouselHome></CarouselHome>
      <JumbotronHome></JumbotronHome>
    </div>
</template>

<script>
import CarouselHome from '@/components/home/CarouselHome.vue'
import JumbotronHome from '@/components/home/JumbotronHome.vue'

export default {
  name: 'home',
  props: ['tokenapp'],
  data () {
    return {
    }
  },
  components: {
    CarouselHome,
    JumbotronHome
  },
  created () {
    let token = localStorage.getItem('token')
    if (token) {
      this.tokenapp = true
    } else {
      this.tokenapp = false
    }
  }
}
</script>

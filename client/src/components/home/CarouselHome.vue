<template>
    <v-carousel hide-delimiters>
        <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
        ></v-carousel-item>
    </v-carousel>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          src: 'https://s14761.pcdn.co/wp-content/uploads/2017/11/Pivot-Mach-5.5-Carbon-Enduro-Mountainbike-MTB-Test-Review-2-von-40-1140x760.jpg'
        },
        {
          src: 'https://cdn.dirtmountainbike.com/featured_image/5ab9316e616cd.jpg'
        },
        {
          src: 'https://images.singletracks.com/blog/wp-content/uploads/2018/05/40083777285_6e2b87ba3f_h-1170x780.jpg'
        },
        {
          src: 'https://i.pinimg.com/originals/26/de/84/26de841726f567967201b2f922430e0b.jpg'
        }
      ]
    }
  }
}
</script>

<style>

</style>

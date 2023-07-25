<template>
  <router-link :to="{ name: 'Album', params: { albumId: albumProp.id } }">

    <div class="rounded light-shadow mb-3" :class="randomColor">
      <img :src="albumProp.coverImg" :alt="albumProp.title" class="img-fluid rounded-top">
      <div class="text-center p-2">
        <h2>{{ albumProp.title }}</h2>
        <h3>
          <i class="mdi mdi-heart"></i>
          <span>{{ albumProp.memberCount }}</span>
        </h3>
      </div>
    </div>
  </router-link>
</template>


<script>
import { Album } from '../models/Album.js';

export default {
  props: {
    // albumProp: { type: Object, required: true }
    // albumProp: { type: [Album, Object], required: true }
    // albumProp: { type: Album, required: true }
    albumProp: { type: Object, required: true } //NOTE: we changed this back to object for the many:many

  },
  setup() {
    function getRandomColor() {
      const colors = ['bg-primary', 'bg-success', 'bg-warning', 'bg-secondary', 'bg-info', 'bg-danger']
      const randomIndex = Math.floor(Math.random() * colors.length)
      return colors[randomIndex]
    }
    return {
      randomColor: getRandomColor()
    }
  }
}
</script>


<style lang="scss" scoped>
img {
  height: 35vh;
  width: 100%;
  object-fit: cover;
  object-position: center;
}
</style>
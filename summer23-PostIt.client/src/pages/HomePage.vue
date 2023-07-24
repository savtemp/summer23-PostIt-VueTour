<template>
  <!-- FIXME album collaborations go here-->
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h1 class="text-light">My Albums</h1>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>

  <div class="container">
    <div class="row">
      <div v-for="album in albums" :key="album.id" class="col-md-3">
        <!-- <div class="bg-light">
          <img :src="album.coverImg" :alt="album.title" class="img-fluid">
          <h2>{{ album.title }}</h2>
        </div> -->
        <AlbumCard :albumProp="album" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { albumsService } from '../services/AlbumsService.js'
import { AppState } from '../AppState.js';

export default {
  setup() {

    async function getAlbums() {
      try {
        await albumsService.getAlbums()
      } catch (error) {
        Pop.error(error.message)
      }
    }
    onMounted(() => {
      getAlbums()
    })


    return {
      albums: computed(() => AppState.albums)
    }
  }
}
</script>

<style scoped lang="scss"></style>

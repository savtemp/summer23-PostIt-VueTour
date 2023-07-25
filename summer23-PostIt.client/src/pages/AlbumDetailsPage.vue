<template>
  <div class="container-fluid">
    <div class="row">
      <!-- SECTION Album details -->
      <div v-if="album" class="col-md-3">
        <div class="d-flex justify-content-between align-items-start">
          <img :src="album.coverImg" :alt="album.title" class="cover-img rounded light-shadow">
          <div class="rounded bg-warning p-1 light-shadow">
            <p class="fs-4 fw-bold">
              {{ album.title }}
            </p>
            <p class="fs-4">
              by: {{ album.creator.name }}
            </p>
          </div>
        </div>
      </div>
      <!-- SECTION Album pictures -->
      <div class="col-md-9"></div>
    </div>
  </div>
</template>


<script>
import { computed, onMounted, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import { albumsService } from '../services/AlbumsService.js';
import { AppState } from '../AppState.js';

export default {
  setup() {
    const route = useRoute()

    async function getAlbumById(albumId) {
      try {
        // const albumId = route.params.albumId
        await albumsService.getAlbumById(albumId)
      } catch (error) {
        Pop.error(error.message)
      }
    }

    // onMounted(() => {
    //   getAlbumById()
    // })

    watchEffect(() => {
      getAlbumById(route.params.albumId)
    })

    return {
      album: computed(() => AppState.activeAlbum)
    }
  }
}
</script>


<style lang="scss" scoped>
.cover-img {
  max-height: 20vh;
  width: 40%;
}
</style>